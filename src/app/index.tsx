
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: string;
};

const courses = ['Starter', 'Main', 'Dessert', 'Beverage'];

export default function HomeScreen() {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!dishName.trim()) {
      newErrors.dishName = 'Dish name is required';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!course) {
      newErrors.course = 'Please select a course';
    }

    if (!price.trim()) {
      newErrors.price = 'Price is required';
    } else if (Number.isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const addMenuItem = () => {
    if (!validateForm()) {
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: Number(price).toFixed(2),
    };

    setMenuItems((items) => [newItem, ...items]);

    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setErrors({});

    Alert.alert(
      'Menu Item Added',
      `${newItem.dishName} has been successfully added to your menu.`
    );
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => {
    return (
      <View style={styles.menuCard}>
        <View style={styles.menuTopRow}>
          <Text style={styles.courseBadge}>{item.course}</Text>
          <Text style={styles.price}>R {item.price}</Text>
        </View>

        <Text style={styles.dishName}>{item.dishName}</Text>

        <Text style={styles.description}>
          {item.description}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={renderMenuItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            <>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.logo}>
                  <Text style={styles.logoText}>CM</Text>
                </View>

                <View>
                  <Text style={styles.title}>
                    Chef's Menu Manager
                  </Text>

                  <Text style={styles.subtitle}>
                    Create and manage your menu
                  </Text>
                </View>
              </View>

              {/* Add Menu Item */}
              <View style={styles.formCard}>
                <Text style={styles.sectionTitle}>
                  Add a Menu Item
                </Text>

                <Text style={styles.sectionSubtitle}>
                  Enter the details of your dish below.
                </Text>

                {/* Dish Name */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Dish Name</Text>

                  <TextInput
                    style={[
                      styles.input,
                      errors.dishName && styles.inputError,
                    ]}
                    placeholder="e.g. Grilled Salmon"
                    placeholderTextColor="#999"
                    value={dishName}
                    onChangeText={setDishName}
                  />

                  {errors.dishName && (
                    <Text style={styles.errorText}>
                      {errors.dishName}
                    </Text>
                  )}
                </View>

                {/* Description */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Description</Text>

                  <TextInput
                    style={[
                      styles.input,
                      styles.descriptionInput,
                      errors.description && styles.inputError,
                    ]}
                    placeholder="Describe the dish..."
                    placeholderTextColor="#999"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    textAlignVertical="top"
                  />

                  {errors.description && (
                    <Text style={styles.errorText}>
                      {errors.description}
                    </Text>
                  )}
                </View>

                {/* Course */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Course</Text>

                  <View style={styles.courseContainer}>
                    {courses.map((item) => (
                      <Pressable
                        key={item}
                        onPress={() => {
                          setCourse(item);

                          setErrors((current) => ({
                            ...current,
                            course: '',
                          }));
                        }}
                        style={[
                          styles.courseButton,
                          course === item &&
                            styles.selectedCourse,
                        ]}
                      >
                        <Text
                          style={[
                            styles.courseText,
                            course === item &&
                              styles.selectedCourseText,
                          ]}
                        >
                          {item}
                        </Text>
                      </Pressable>
                    ))}
                  </View>

                  {errors.course && (
                    <Text style={styles.errorText}>
                      {errors.course}
                    </Text>
                  )}
                </View>

                {/* Price */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Price</Text>

                  <View
                    style={[
                      styles.priceInputContainer,
                      errors.price && styles.inputError,
                    ]}
                  >
                    <Text style={styles.currency}>R</Text>

                    <TextInput
                      style={styles.priceInput}
                      placeholder="0.00"
                      placeholderTextColor="#999"
                      value={price}
                      onChangeText={setPrice}
                      keyboardType="decimal-pad"
                    />
                  </View>

                  {errors.price && (
                    <Text style={styles.errorText}>
                      {errors.price}
                    </Text>
                  )}
                </View>

                {/* Add Button */}
                <Pressable
                  onPress={addMenuItem}
                  style={({ pressed }) => [
                    styles.addButton,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <Text style={styles.addButtonText}>
                    + Add Menu Item
                  </Text>
                </Pressable>
              </View>

              {/* Menu Heading */}
              <View style={styles.menuHeader}>
                <Text style={styles.sectionTitle}>
                  Your Menu
                </Text>

                <Text style={styles.sectionSubtitle}>
                  All menu items you have added
                </Text>
              </View>

              {/* Empty State */}
              {menuItems.length === 0 && (
                <View style={styles.emptyCard}>
                  <Text style={styles.emptyIcon}>🍽️</Text>

                  <Text style={styles.emptyTitle}>
                    No menu items yet
                  </Text>

                  <Text style={styles.emptyText}>
                    Add your first dish using the form above.
                    Your menu items will appear here.
                  </Text>
                </View>
              )}
            </>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F4EE',
  },

  container: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  logo: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#263D2E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  title: {
    fontSize: 23,
    fontWeight: '800',
    color: '#20241F',
  },

  subtitle: {
    marginTop: 4,
    color: '#77736B',
    fontSize: 13,
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5DFD4',
    marginBottom: 26,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#20241F',
  },

  sectionSubtitle: {
    fontSize: 13,
    color: '#77736B',
    marginTop: 4,
    marginBottom: 18,
  },

  inputGroup: {
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#383831',
    marginBottom: 7,
  },

  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#D9D3C9',
    borderRadius: 10,
    backgroundColor: '#FCFBF8',
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#22231F',
  },

  descriptionInput: {
    minHeight: 90,
    paddingTop: 13,
  },

  inputError: {
    borderColor: '#C94B4B',
  },

  errorText: {
    color: '#C24444',
    fontSize: 12,
    marginTop: 5,
  },

  courseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  courseButton: {
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D9D3C9',
    backgroundColor: '#FCFBF8',
  },

  selectedCourse: {
    backgroundColor: '#263D2E',
    borderColor: '#263D2E',
  },

  courseText: {
    color: '#555149',
    fontWeight: '700',
    fontSize: 13,
  },

  selectedCourseText: {
    color: '#FFFFFF',
  },

  priceInputContainer: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D9D3C9',
    borderRadius: 10,
    backgroundColor: '#FCFBF8',
    flexDirection: 'row',
    alignItems: 'center',
  },

  currency: {
    paddingLeft: 14,
    fontSize: 15,
    fontWeight: '700',
    color: '#555149',
  },

  priceInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#22231F',
  },

  addButton: {
    height: 51,
    borderRadius: 11,
    backgroundColor: '#263D2E',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },

  buttonPressed: {
    opacity: 0.75,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  menuHeader: {
    marginBottom: 13,
  },

  emptyCard: {
    backgroundColor: '#FFFDF9',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E4DED3',
    borderStyle: 'dashed',
    padding: 25,
    alignItems: 'center',
  },

  emptyIcon: {
    fontSize: 30,
    marginBottom: 8,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#30312B',
  },

  emptyText: {
    fontSize: 13,
    color: '#77736B',
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 6,
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5DFD4',
    padding: 16,
    marginBottom: 12,
  },

  menuTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  courseBadge: {
    backgroundColor: '#EEF1E9',
    color: '#38543F',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    overflow: 'hidden',
    fontSize: 11,
    fontWeight: '800',
  },

  price: {
    color: '#263D2E',
    fontSize: 15,
    fontWeight: '800',
  },

  dishName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#20241F',
    marginTop: 12,
  },

  description: {
    fontSize: 13,
    lineHeight: 19,
    color: '#77736B',
    marginTop: 5,
  },
});