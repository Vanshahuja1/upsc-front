// apiHelper.ts - Helper functions for API integration

import { CartStore, Course, OrderData, OrderResponse, TestSeries } from "@/types";
import { fetchData } from "@/utils/apiUtils";

// Function to create order using the backend API structure
export const createOrder = async (
  orderData: Omit<OrderData, 'course_slugs' | 'test_series_slugs'>,
  cartItems: CartStore[],
  discountAmount: number = 0,
  promoCode?: string
): Promise<OrderResponse> => {
  
  // Separate courses and test series
  const courses = cartItems.filter(item => item.type === 'course');
  const testSeries = cartItems.filter(item => item.type === 'test_series');
  
  const payload: OrderData = {
    ...orderData,
    course_slugs: courses.map(course => course.slug),
    test_series_slugs: testSeries.map(series => series.slug),
    discount_amount: discountAmount,
    promo_code_applied: promoCode,
  };

  try {
    const response = await fetchData<OrderResponse>('/orders', {
      method: 'POST',
      data: payload, // Use 'data' instead of 'body' for Axios
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response) {
      throw new Error('No response received from server');
    }

    return response;
  } catch (error) {
    throw new Error(`Failed to create order: ${error}`);
  }
};

// Function to convert course/test series from API to CartStore format
export const convertToCartItem = (
  item: any, 
  type: 'course' | 'test_series'
): CartStore => {
  return {
    heading: item.heading,
    slug: item.slug,
    sub_heading: item.sub_heading,
    language: item.language,
    duration: item.duration,
    video_lectures: item.video_lectures,
    questions_count: item.questions_count,
    price: item.price,
    short_description: item.short_description,
    featured_image_url: item.featured_image_url,
    study_material_url: item.study_material_url,
    timetable_url: item.timetable_url,
    faculties: item.faculties?.map((faculty: any) => ({
      name: faculty.name,
      slug: faculty.slug,
      designation: faculty.designation,
      featured_image_url: faculty.featured_image_url,
    })) || [],
    type: type,
    featured: item.featured,
    sequence: item.sequence,
    // Additional fields for test series if needed
    testCount: type === 'test_series' ? item.test_count : undefined,
    subjects: type === 'test_series' ? item.subjects : undefined,
  };
};

// Function to add course to cart from course page
export const addCourseToCart = (course: Course, addCourse: (course: CartStore) => void) => {
  const cartItem = convertToCartItem(course, 'course');
  addCourse(cartItem);
};

// Function to add test series to cart from test series page
export const addTestSeriesToCart = (testSeries: TestSeries, addCourse: (course: CartStore) => void) => {
  const cartItem = convertToCartItem(testSeries, 'test_series');
  addCourse(cartItem);
};