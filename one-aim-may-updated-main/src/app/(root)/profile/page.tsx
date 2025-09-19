"use client";
import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaUserTag } from "react-icons/fa";
import { MdEdit, MdVerified, MdClose } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { BiTime } from "react-icons/bi";
import { fetchData } from "@/utils/apiUtils";
import Image from "next/image";

interface UserProfile {
  id: number;
  name: string;
  username: string;
  email: string;
  mobile: string;
  profile_picture: string | null;
  email_verified_at: string | null;
  status: boolean;
  role: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface PurchasedCourse {
  id: number;
  heading: string;
  slug: string;
  featured_image_url: string;
  price: number;
  duration: string;
  type: 'course' | 'test_series';
  purchase_date: string;
  status: string;
}

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [purchasedCourses, setPurchasedCourses] = useState<PurchasedCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    username: "",
    mobile: "",
  });

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication token not found');
        return;
      }

      const response = await fetch('https://admin.theoneaim.co.in/api/v1/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-api-key': 'ak_y6d4lk60QIrkdu23knAdJLeyabdEerT5',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const data = await response.json();
      setUserProfile(data);
      setEditForm({
        name: data.name,
        username: data.username,
        mobile: data.mobile,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's purchased courses
  const fetchPurchasedCourses = async () => {
    try {
      setCoursesLoading(true);
      const token = localStorage.getItem('token');
      const userDataString = localStorage.getItem('user');
      
      if (!token || !userDataString) {
        return;
      }

      const userData = JSON.parse(userDataString);
      const userId = userData.id;

      // Fetch all orders and filter for the current user
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-api-key': 'ak_y6d4lk60QIrkdu23knAdJLeyabdEerT5',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('All orders response:', data); // Debug log
        
        // Process the orders to extract courses for the current user
        const courses: PurchasedCourse[] = [];
        
        if (data.data && Array.isArray(data.data)) {
          // Filter orders for the current user
          const userOrders = data.data.filter((order: any) => 
            order.frontend_user_id === userId || 
            order.user_id === userId ||
            order.frontend_user_id === String(userId) ||
            order.user_id === String(userId)
          );
          
          console.log('User orders found:', userOrders.length); // Debug log
          
          userOrders.forEach((order: any) => {
            // Add courses from this order
            if (order.courses && Array.isArray(order.courses)) {
              order.courses.forEach((course: any) => {
                courses.push({
                  id: course.id,
                  heading: course.heading,
                  slug: course.slug,
                  featured_image_url: course.featured_image_url || '/images/placeholder.png',
                  price: course.price || 0,
                  duration: course.duration || '',
                  type: 'course',
                  purchase_date: order.created_at,
                  status: order.status || 'completed'
                });
              });
            }
            
            // Add test series from this order
            if (order.test_series && Array.isArray(order.test_series)) {
              order.test_series.forEach((testSeries: any) => {
                courses.push({
                  id: testSeries.id,
                  heading: testSeries.heading,
                  slug: testSeries.slug,
                  featured_image_url: testSeries.featured_image_url || '/images/placeholder.png',
                  price: testSeries.price || 0,
                  duration: testSeries.duration || '',
                  type: 'test_series',
                  purchase_date: order.created_at,
                  status: order.status || 'completed'
                });
              });
            }
          });
        }
        
        console.log('Processed courses:', courses); // Debug log
        setPurchasedCourses(courses);
      } else {
        console.error('Failed to fetch orders:', response.status, response.statusText);
      }
    } catch (err) {
      console.error('Error fetching purchased courses:', err);
    } finally {
      setCoursesLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchPurchasedCourses();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (userProfile) {
      setEditForm({
        name: userProfile.name,
        username: userProfile.username,
        mobile: userProfile.mobile,
      });
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication token not found');
        return;
      }

      // Get user ID from localStorage
      const userDataString = localStorage.getItem('user');
      let userId = null;
      
      if (userDataString) {
        try {
          const userData = JSON.parse(userDataString);
          userId = userData.id;
        } catch (parseError) {
          console.error('Error parsing user data:', parseError);
        }
      }
      
      // If no user ID in localStorage, use the current profile ID
      if (!userId && userProfile) {
        userId = userProfile.id;
      }
      
      if (!userId) {
        setError('User ID not found. Please login again.');
        return;
      }

      // Prepare payload with frontend_user_id
      const payload = {
        frontend_user_id: userId,
        name: editForm.name,
        username: editForm.username,
        mobile: editForm.mobile,
      };

      console.log('Update payload:', payload); // Debug log

      const response = await fetch('https://admin.theoneaim.co.in/api/v1/auth/profile/updatess', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-api-key': 'ak_y6d4lk60QIrkdu23knAdJLeyabdEerT5',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Update error:', errorData);
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const updatedData = await response.json();
      console.log('Update response:', updatedData); // Debug log
      
      // Update the user profile with the response data
      if (updatedData.success && updatedData.data) {
        setUserProfile(updatedData.data);
        
        // Also update localStorage with new user data
        localStorage.setItem('user', JSON.stringify(updatedData.data));
      } else {
        setUserProfile(prev => prev ? { ...prev, ...editForm } : null);
      }
      
      setIsEditing(false);
      
      // Show success message
      alert('Profile updated successfully!');
      
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primaryred"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.href = '/auth/login'}
            className="mt-4 px-6 py-2 bg-primaryred text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">No profile data found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-primaryred to-red-600 h-32 sm:h-40"></div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end -mt-16 sm:-mt-20">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white p-1 shadow-lg">
                  {userProfile.profile_picture ? (
                    <Image
                      src={userProfile.profile_picture}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                      <FaUser className="text-gray-400 text-4xl" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* User Info */}
              <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {userProfile.name}
                    </h1>
                    <p className="text-gray-600">@{userProfile.username}</p>
                    <div className="flex items-center mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        userProfile.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {userProfile.status ? 'Active' : 'Inactive'}
                      </span>
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                        {userProfile.role}
                      </span>
                    </div>
                  </div>
                  
                  {/* Edit Button */}
                  <div className="mt-4 sm:mt-0">
                    {!isEditing ? (
                      <button
                        onClick={handleEdit}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primaryred hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryred transition-colors"
                      >
                        <MdEdit className="mr-2" />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSave}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                        >
                          <IoMdCheckmark className="mr-1" />
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryred transition-colors"
                        >
                          <MdClose className="mr-1" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryred focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center">
                    <FaUser className="text-gray-400 mr-3" />
                    <span className="text-gray-900">{userProfile.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryred focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center">
                    <FaUserTag className="text-gray-400 mr-3" />
                    <span className="text-gray-900">@{userProfile.username}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-400 mr-3" />
                  <span className="text-gray-900">{userProfile.email}</span>
                  {userProfile.email_verified_at && (
                    <MdVerified className="text-green-500 ml-2" title="Email Verified" />
                  )}
                </div>
                {/* {!userProfile.email_verified_at && (
                  <p className="text-sm text-amber-600 mt-1">Email not verified</p>
                )} */}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.mobile}
                    onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryred focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center">
                    <FaPhone className="text-gray-400 mr-3" />
                    <span className="text-gray-900">{userProfile.mobile}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Role
                </label>
                <div className="flex items-center">
                  <FaUserTag className="text-gray-400 mr-3" />
                  <span className="text-gray-900 capitalize">{userProfile.role}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Status
                </label>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    userProfile.status ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-gray-900">
                    {userProfile.status ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Member Since
                </label>
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-400 mr-3" />
                  <span className="text-gray-900">{formatDate(userProfile.created_at)}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Updated
                </label>
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-400 mr-3" />
                  <span className="text-gray-900">{formatDate(userProfile.updated_at)}</span>
                </div>
              </div>

              {userProfile.email_verified_at && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Verified
                  </label>
                  <div className="flex items-center">
                    <MdVerified className="text-green-500 mr-3" />
                    <span className="text-gray-900">{formatDate(userProfile.email_verified_at)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Purchased Courses */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My Purchased Courses</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                {purchasedCourses.length} course{purchasedCourses.length !== 1 ? 's' : ''}
              </span>
              <button
                onClick={fetchPurchasedCourses}
                disabled={coursesLoading}
                className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <svg
                  className={`w-4 h-4 mr-1 ${coursesLoading ? 'animate-spin' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </button>
            </div>
          </div>
          
          {coursesLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primaryred"></div>
              <span className="ml-2 text-gray-600">Loading courses...</span>
            </div>
          ) : purchasedCourses.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses purchased yet</h3>
              <p className="text-gray-600 mb-4">Start your learning journey by purchasing your first course!</p>
              <button 
                onClick={() => window.location.href = '/course'}
                className="px-6 py-2 bg-primaryred text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedCourses.map((course) => (
                <div key={course.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="relative mb-3">
                    <Image
                      src={course.featured_image_url}
                      alt={course.heading}
                      width={300}
                      height={160}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.type === 'course' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {course.type === 'course' ? 'Course' : 'Test Series'}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {course.heading}
                  </h3>
                  
                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    {course.duration && (
                      <div className="flex items-center">
                        <BiTime className="mr-1" />
                        <span>{course.duration}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      <span>Purchased: {new Date(course.purchase_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold text-primaryred">₹{course.price}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.location.href = `/${course.type}/${course.slug}`}
                      className="flex-1 bg-primaryred text-white py-2 px-3 rounded-md hover:bg-red-600 transition-colors text-sm"
                    >
                      Access Course
                    </button>
                    <button
                      onClick={() => window.location.href = `/${course.type}/${course.slug}`}
                      className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
              <MdEdit className="mr-2" />
              Change Password
            </button>
            {/* <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
              <FaEnvelope className="mr-2" />
              Update Email
            </button> */}
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/auth/login';
              }}
              className="flex items-center justify-center px-4 py-3 border border-red-300 rounded-md text-red-700 hover:bg-red-50 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;