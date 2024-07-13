// @fired-up-ai/common-ui/src/components/ValidatedText.tsx
import React from 'react';
import { TextInput, Text, View, StyleSheet, TextInputProps } from 'react-native';

interface ValidatedTextProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  validator: (text: string) => string | null;
}

const ValidatedText: React.FC<ValidatedTextProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  validator,
  ...rest
}) => {
  const [error, setError] = React.useState<string | null>(null);

  const handleChangeText = (text: string) => {
    onChangeText(text);
    setError(validator(text));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={value}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        {...rest}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default ValidatedText;