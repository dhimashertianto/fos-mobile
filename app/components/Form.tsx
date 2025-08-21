import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {useTheme} from '../theme/useTheme';
import {spacing, typeSizes} from '../theme/theme';
import {InputPropsType} from '../types/components';
import Icon from 'react-native-vector-icons/Ionicons';

const Input = ({lables, style, error, leftIcon, ...rest}: InputPropsType) => {
  const {theme} = useTheme();

  return (
    <View style={styles.inputWrp}>
      <Text style={[styles.label, {color: theme.color}]}>
        {lables || 'Lables'}
      </Text>
      <TextInput
        {...rest}
        style={[
          styles.input,
          {color: theme.color, borderColor: theme.layoutBg},
          {...style},
        ]}
      />
      {leftIcon ? (
        <View style={styles.leftIcon}>
          <Icon name={leftIcon} size={20} color={theme.color} />
        </View>
      ) : null}
      {error ? (
        <Text
          testID={rest.testID + '-error'}
          style={[styles.error, {color: theme.error}]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export {Input};

const styles = StyleSheet.create({
  label: {
    fontSize: typeSizes.FONT_SIZE_SMALL,
    marginBottom: spacing.containerPaddingV / 2,
  },
  inputWrp: {
    marginBottom: spacing.cardMarginB,
    position: 'relative',
  },
  input: {
    height: 45,
    borderColor: '#000000',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: spacing.borderRadius,
    paddingHorizontal: 20,
  },
  error: {
    fontSize: typeSizes.FONT_SIZE_SMALL,
  },
  leftIcon: {
    position: 'absolute',
    right: 20,
    top: 40,
    zIndex: 1000,
  },
});
