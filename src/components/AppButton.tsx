import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { colors } from '../theme/colors';

type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'accent';
  icon?: IconName;
};

export default function AppButton({ title, onPress, loading = false, variant = 'primary', icon }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: variant === 'primary' ? colors.primary : colors.accent },
        pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          {icon && <MaterialIcons name={icon} size={22} color="#fff" style={styles.icon} />}
          <Text style={styles.text}>{title}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  pressed: { opacity: 0.8 },
  icon: { marginRight: 8 },
  text: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
