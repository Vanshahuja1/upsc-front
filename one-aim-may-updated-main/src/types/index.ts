export interface OrderData {
  name: string;
  email: string;
  phone: string;
  address: string;
  pin_code: string;
  city: string;
  state: string;
  country: string;
  course_slugs: string[];
  test_series_slugs: string[];
  promo_code_applied?: string;
  discount_amount?: number;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data?: {
    order: {
      order_number: string;
      name: string;
      email: string;
      phone: string;
      address: string;
      pin_code: string;
      city: string;
      state: string;
      country: string;
      status: string;
      gross_amount: number;
      discount_amount: number;
      net_amount: number;
      promo_code_applied?: string;
    };
    courses: Array<{
      heading: string;
      slug: string;
    }>;
    test_series: Array<{
      heading: string;
      slug: string;
    }>;
  };
}

// Update your existing Discount interface to be more flexible
export interface Discount {
  code: string;
  percentage?: number;
  description?: string;
  valid_until?: string;
  discount_amount?: number; // Add this for fixed amount discounts
}
export interface Career {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  qualification: string;
  resume: File;
  job_opening: string;
  message: string;
}
//################################################################################ Courses Interfcae ################################################################################################################
export interface CourseCategory {
  name: string;
  slug: string;
  sequence: number;
  children: CourseCategoryChild[];
  courses: Course[];
}
interface CourseCategoryChild {
  name: string;
  slug: string;
  sequence: number;
  courses: Course[];
}

export interface Course {
  type: string;

  heading: string;

  slug: string;
  sub_heading?: string | null;
  language?: string;
  duration: string;
  video_lectures: string;
  questions_count: string;
  price: number;
  short_description: string;
  featured?: boolean;
  sequence?: number;
  featured_image_url: string;
  content?: string | TrustedHTML;
  study_material_url?: string;
  timetable_url?: string;
  course_course_contents?: CourseContent[];
  course_course_faqs?: CourseFAQ[];
  faculties?: Faculty[];
}
export interface CourseContent {
  title: string;
  content: string;
  sequence: number;
}
export interface CourseFAQ {
  question: string;
  answer: string;
  sequence: number;
}
export interface Faculty {
  name: string;
  slug: string;
  designation: string | null;
  experience: string | null;
  qualifications: string | null;
  specialization: string | null;
  short_description: string | null;
  long_description: string | null;
  facebook_link: string | null;
  instagram_link: string | null;
  twitter_link: string | null;
  linkedin_link: string | null;
  youtube_link: string | null;
  sequence: number;
  featured_image_url: string | null;
}

export type CourseCategoryList = CourseCategory[];

export interface SingleCourse extends Course {
  related_courses: Course[];
  faculties: Faculty[];
  enrolment_deadline_date?: string;
  extra_content?: string;   //  ye add karo
  
  slug: string;
   study_materials?: { 
    name: string; 
    url: string; 
  }[];

}

//################################################################################ Courses Interfcae ################################################################################################################

// Email
interface EmailItem {
  email: string;
}

type EmailList = EmailItem[];

// Address
interface AddressItem {
  address: string;
}

type AddressList = AddressItem[];

// Phone
interface PhoneItem {
  number: string;
  whatsapp: number; // 1 for true, 0 for false
}

type PhoneList = PhoneItem[];

// Social Media
interface SocialMedia {
  facebook_link: string | null;
  instagram_link: string | null;
  twitter_link: string | null;
  linkedin_link: string | null;
  youtube_link: string | null;
}

// Organization Info
export interface OrganizationInfo {
  name: string;
  map_link: string | null;
  favicon_url: string | null;
  logo_url: string | null;
  emails: EmailList;
  addresses: AddressList;
  phones: PhoneList;
  social_media: SocialMedia;
}

export interface TestimonialItem {
  name: string;
  sub_heading: string;
  content: string;
  caption: string | null;
  sequence: number;
  image_url: string;
}

export type TestimonialList = TestimonialItem;

//Blog

interface BlogCategory {
  name: string;
  slug: string;
}

export interface Blogs {
  title: string;
  slug: string;
  heading: string | null;
  short_description: string | null;
  featured_image_caption: string | null;
  type: string;
  publish_date: string; // format: dd-mm-yyyy
  featured_image_url: string;
  blog_categories: BlogCategory[];
}
interface RelatedBlog {
  title: string;
  slug: string;
  short_description: string;
  publish_date: string; // format: dd-mm-yyyy
  featured_image_url: string;
}

export interface TypeBlogShow extends Blogs {
  content: string;
  related_blogs: RelatedBlog[];
}

// FAQ
export interface FAQType {
  question: string;
  answer: string;
  sequence: number;
  active: number; // Consider changing to boolean if appropriate
  created_at: string; // format: YYYY-MM-DD HH:mm:ss
  updated_at: string; // format: YYYY-MM-DD HH:mm:ss
}

export interface TypeFacultyShow extends Faculty {
  courses: Course[];
  testSeries: TestSeries[];
  test_series?: TestSeries[];
}

// Order Form Scema
export interface OrderFormSchema {
  name: string;
  email: string;
  phone: string;
  address: string;
  pin_code: string;
  city: string;
  state: string;
  country: string;
}

export interface OrderFormErrors {
  name?: string[];
  email?: string[];
  phone?: string[];
  address?: string[];
  pin_code?: string[];
  city?: string[];
  state?: string[];
  country?: string[];
}

export interface CartStore {
  type: 'course' | 'test_series'; // Make this more specific
  slug: string;
  heading: string;
  sub_heading?: string;
  faculty?: string[] | Faculty[]; // Allow both string array and Faculty array
  faculties?: Faculty[]; // Add this to match your backend structure
  duration: string;
  price: number;
  image?: string; // Make optional since you're using featured_image_url
  featured_image_url?: string; // Add this to match backend
  language?: string;
  video_lectures?: string;
  questions_count?: string;
  short_description?: string;
  study_material_url?: string;
  timetable_url?: string;
  featured?: boolean;
  sequence?: number;
  // Additional fields for test series
  testCount?: number;
  subjects?: string[];
}


interface TestSeriesPivot {
  test_series_category_id: number;
  test_series_id: number;
  faculties?: Faculty[];
}

export interface TestSeries {
  heading: string;
  slug: string;
  sub_heading: string;
  language: string;
  duration: string;
  video_lectures: string;
  questions_count: string;
  price: number;
  short_description: string;
  featured: number;
  sequence: number;
  featured_image_url: string | null;
  study_material_url: string;
  timetable_url: string;
  faculties?: Faculty[];
  pivot: TestSeriesPivot;
}

interface TestSeriesChildCategory {
  name: string;
  slug: string;
  sequence: number;
  test_series: TestSeries[];
  faculties?: Faculty[];
}

export interface TestSeriesCategory {
  name: string;
  slug: string;
  sequence: number;
  children: TestSeriesChildCategory[];
  test_series: TestSeries[];
  faculties?: Faculty[];
}

export interface TestSeriesDetails {
  heading: string;
  slug: string;
  sub_heading: string;
  language: string;
  duration: string;
  video_lectures: string;
  questions_count: string;
  enrolment_deadline_date: string;
  price: number;
  short_description: string;
  long_description: string;
  content: string;
  extra_content: string | null;
  featured_image_caption: string | null;
  featured: number;
  sequence: number;
  featured_image_url: string | null;
  study_material_url: string;
  timetable_url: string;
  test_series_categories: TestSeriesCategory[];
  faculties: Faculty[];
}

export interface JobOpening {
  id: number;
  designation: string;
  location: string;
  content: string; // HTML content
  sequence: number;
}

export interface CareerApplication {
  message: string;
  application: {
    name: string;
    email: string;
    phone: string;
    location: string;
    experience: string;
    qualifications: string;
    message: string;
    job_opening_designation: string;
    submitted_at: string; // ISO timestamp
  };
}
