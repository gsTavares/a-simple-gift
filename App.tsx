import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import { Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from 'tailwindcss/colors';
import { MotiText, MotiTransitionProp, useAnimationState } from 'moti/build';
import { useFonts, Chivo_400Regular } from '@expo-google-fonts/chivo'
import { useState } from 'react';


export default function App() {

  let [fontsLoaded] = useFonts({
    Chivo_400Regular
  })

  const mainViewState = useAnimationState({
    from: {
      opacity: 1
    },

    to: {
      opacity: 1
    },

    onGiftPress: {
      opacity: 0
    }

  })

  const giftViewState = useAnimationState({
    from: {
      opacity: 0
    },

    to: {
      opacity: 1
    },

    whileGiftPressed: {
      scale: 1.8,
      top: [-300, -350, -300]
    },

    giftPressedOut: {
      scale: 1,
      top: 0
    }
  })

  const gitfState = useAnimationState({
    from: {
      opacity: 0,
    },

    to: {
      opacity: [{ value: 0 }, { value: 1 }]
    },

    pressIn: {
      opacity: [{ value: 1 }, { value: 1 }]
    }
  })

  const giftShowingState = useAnimationState({
    from: {
      opacity: 0
    },

    to: {
      opacity: 0
    },

    whileGiftPressed: {
      opacity: 1
    }
  })

  const [giftName, setGiftName] = useState('');

  if (!fontsLoaded) {
    return null;
  }

  const allGifts = ['smartphone', 'headset', 'calculator', 'blue pen', 'book', 'computer']

  const pickGift = (): void => {
    const index: number = Math.floor(Math.random() * 5);
    setGiftName(allGifts.filter((gift, giftIndex) => index === giftIndex)[0]);
  }

  const handleGiftPressIn = () => {
    mainViewState.transitionTo('onGiftPress');
    giftViewState.transitionTo('whileGiftPressed');
    gitfState.transitionTo('pressIn');
    giftShowingState.transitionTo('whileGiftPressed');
    pickGift();
  }

  return (
    <MotiView className='w-full h-full justify-center items-center px-5'>
      <MotiView state={mainViewState} className="items-center">
        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 1000 }}>
          <Text style={styles.defaultFont} className='text-5xl '>Hello</Text>
        </MotiView>

        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 1000, delay: 2000 }}>
          <Text style={styles.defaultFont} className='text-2xl '>If u are receiving this,</Text>
        </MotiView>

        <MotiView className='text-center flex-row items-center gap-x-2' from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 1000, delay: 4000 }}>
          <Text style={styles.defaultFont} className='text-sm text-center '>know that you are very special to me</Text>
          <Ionicons name='heart' size={20} color={colors.red[500]} />
        </MotiView>

        <MotiView className='mt-8 items-center' from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 1000, delay: 7000 }}>
          <Text style={styles.defaultFont} className='text-2xl '>Here is your gift</Text>
          <Text style={styles.defaultFont} className='text-sm'>tap and hold to see it :p</Text>
        </MotiView>
      </MotiView>

      <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} delay={9000}>
        <MotiView state={giftViewState} className='mt-3'>
          <MotiView className='items-center' state={gitfState} transition={{ loop: true, duration: 1300 }}>
            <Pressable
              onPressIn={() => {
                handleGiftPressIn();
              }}

              onPressOut={() => {
                mainViewState.transitionTo('from')
                gitfState.transitionTo('to');
                giftViewState.transitionTo('giftPressedOut')
                giftShowingState.transitionTo('to');
              }}
            >
              <Ionicons name='gift-outline' size={80} color={colors.green[400]} />
            </Pressable>

            <MotiView state={giftShowingState}>
              <Text className='text-center'>Congrats!</Text>
              <Text className='text-center'>You won a {giftName}!!</Text>
            </MotiView>
          </MotiView>
        </MotiView>
      </MotiView>

      <StatusBar style="auto" />
    </MotiView>
  );
}

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: 'Chivo_400Regular',
  }
})

