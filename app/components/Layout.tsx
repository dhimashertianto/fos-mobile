import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../theme/useTheme';

import {LayoutPropsType} from '../types/components';
import {ThemeContextInterface} from '../theme/useTheme';

const Layout = ({children, style, ...rest}: LayoutPropsType) => {
  const {theme}: Partial<ThemeContextInterface> = useTheme();
  return (
    <SafeAreaView style={styles.container} {...rest}>
      <StatusBar
        animated
        backgroundColor={theme.cardBg}
        barStyle={theme?.name === 'light' ? 'dark-content' : 'light-content'}
      />
      <View testID="Layout.LayoutContainer" style={[styles.layout, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ffffff'},
  layout: {
    flex: 1,
    marginHorizontal: 16,
  },
});

export default Layout;
