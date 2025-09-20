"use client";
import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaUserTag, FaCamera } from "react-icons/fa";
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
  heading: string;
  slug: string;
  sub_heading: string | null;
  language: string | null;
  duration: string | null;
  video_lectures: number | null;
  questions_count: number | null;
  enrolment_deadline_date: string | null;
  price: number;
  short_description: string;
  featured_image_url: string;
}

interface PurchasedMaterialResponse {
  success: boolean;
  purchased_courses: PurchasedCourse[];
  purchased_test_series: PurchasedCourse[];
}

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [purchasedCourses, setPurchasedCourses] = useState<PurchasedCourse[]>([]);
  const [purchasedTestSeries, setPurchasedTestSeries] = useState<PurchasedCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    username: "",
    mobile: "",
  });
  const [selectedProfilePic, setSelectedProfilePic] = useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication token not found');
        // Try to get user data from localStorage as fallback
        const userData = localStorage.getItem('user');
        if (userData) {
          try {
            const parsedUser = JSON.parse(userData);
            setUserProfile(parsedUser);
            setEditForm({
              name: parsedUser.name || "",
              username: parsedUser.username || "",
              mobile: parsedUser.mobile || "",
            });
          } catch (parseError) {
            console.error('Error parsing user data from localStorage:', parseError);
          }
        }
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
      console.log('Profile API response:', data); // Debug log
      
      // Handle the response - extract user data from the response
      const profileData = data.user || data.data || data;
      console.log('Extracted profile data:', profileData); // Debug log
      
      // Extract profile picture URL - handle both response formats
      let profilePictureUrl = null;
      
      // Format 1: profile_picture is an object with original_url (GET /profile response)
      if (profileData.profile_picture && typeof profileData.profile_picture === 'object' && profileData.profile_picture.original_url) {
        profilePictureUrl = profileData.profile_picture.original_url;
      }
      // Format 2: profile_picture is null/string, check media array (POST /updatess response)
      else if (profileData.media && profileData.media.length > 0) {
        const profilePicMedia = profileData.media.find((media: any) => 
          media.collection_name === 'profile_picture'
        );
        if (profilePicMedia) {
          profilePictureUrl = profilePicMedia.original_url;
        }
      }
      // Format 3: profile_picture is already a direct URL string
      else if (profileData.profile_picture && typeof profileData.profile_picture === 'string') {
        profilePictureUrl = profileData.profile_picture;
      }
      
      // Update profile data with extracted picture URL
      const processedProfileData = {
        ...profileData,
        profile_picture: profilePictureUrl
      };
      
      setUserProfile(processedProfileData);
      setEditForm({
        name: processedProfileData.name || "",
        username: processedProfileData.username || "",
        mobile: processedProfileData.mobile || "",
      });
    } catch (err) {
      console.error('Profile fetch error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      
      // Try to get user data from localStorage as fallback
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUserProfile(parsedUser);
          setEditForm({
            name: parsedUser.name || "",
            username: parsedUser.username || "",
            mobile: parsedUser.mobile || "",
          });
          setError(null); // Clear error since we found fallback data
        } catch (parseError) {
          console.error('Error parsing user data from localStorage:', parseError);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's purchased materials
  const fetchPurchasedMaterials = async () => {
    try {
      setCoursesLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await fetch('https://admin.theoneaim.co.in/api/v1/auth/my-material', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'x-api-key': 'ak_y6d4lk60QIrkdu23knAdJLeyabdEerT5',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch purchased materials');
      }

      const data: PurchasedMaterialResponse = await response.json();
      
      if (data.success) {
        setPurchasedCourses(data.purchased_courses || []);
        setPurchasedTestSeries(data.purchased_test_series || []);
        console.log('Purchased materials loaded:', data);
      }
    } catch (err) {
      console.error('Error fetching purchased materials:', err);
    } finally {
      setCoursesLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchPurchasedMaterials();
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
    // Populate form with current profile data
    if (userProfile) {
      setEditForm({
        name: userProfile.name,
        username: userProfile.username,
        mobile: userProfile.mobile,
      });
    }
    setSelectedProfilePic(null);
    setProfilePicPreview(null);
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
    setSelectedProfilePic(null);
    setProfilePicPreview(null);
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Profile picture selected:', file.name, file.size, 'bytes', file.type);
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }
      
      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB.');
        return;
      }
      
      setSelectedProfilePic(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        console.log('Profile picture preview created');
        setProfilePicPreview(result);
      };
      reader.onerror = (e) => {
        console.error('Error reading file:', e);
        alert('Error reading the selected file.');
      };
      reader.readAsDataURL(file);
    }
  };

  const debugProfileState = () => {
    console.log('=== PROFILE DEBUG INFO ===');
    console.log('userProfile:', userProfile);
    console.log('selectedProfilePic:', selectedProfilePic);
    console.log('profilePicPreview:', profilePicPreview ? 'Present' : 'None');
    console.log('editForm:', editForm);
    console.log('isEditing:', isEditing);
    console.log('localStorage token:', localStorage.getItem('token') ? 'Present' : 'Missing');
    console.log('localStorage user:', localStorage.getItem('user'));
    console.log('=== END DEBUG INFO ===');
  };

  const testApiCall = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Testing API call with token:', token);
      
      const response = await fetch('https://admin.theoneaim.co.in/api/v1/auth/profile/updatess', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'x-api-key': 'ak_y6d4lk60QIrkdu23knAdJLeyabdEerT5',
        },
      });
      
      console.log('Test API Response status:', response.status);
      console.log('Test API Response headers:', response.headers);
      
      const data = await response.text();
      console.log('Test API Response body:', data);
      
    } catch (error) {
      console.error('Test API Error:', error);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
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

      // Prepare FormData for multipart/form-data request
      const formData = new FormData();
      formData.append('frontend_user_id', userId.toString());
      formData.append('name', editForm.name);
      formData.append('username', editForm.username);
      formData.append('mobile', editForm.mobile);
      
      // Add email if available (may be required by API)
      if (userProfile?.email) {
        formData.append('email', userProfile.email);
      }
      
      // Add profile picture if selected
      if (selectedProfilePic) {
        formData.append('profile_picture', selectedProfilePic);
      }

      console.log('Update payload:', {
        frontend_user_id: userId,
        name: editForm.name,
        username: editForm.username,
        mobile: editForm.mobile,
        email: userProfile?.email,
        profile_picture: selectedProfilePic ? selectedProfilePic.name : 'none'
      }); // Debug log

      // Log FormData contents for debugging
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(key, '(File):', value.name, value.size, 'bytes');
        } else {
          console.log(key, ':', value);
        }
      }

      const response = await fetch('https://admin.theoneaim.co.in/api/v1/auth/profile/updatess', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'x-api-key': 'ak_y6d4lk60QIrkdu23knAdJLeyabdEerT5',
        },
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = 'Failed to update profile';
        try {
          const errorData = await response.json();
          console.error('Update error response:', errorData);
          errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const updatedData = await response.json();
      console.log('Update response:', updatedData); // Debug log
      
      // Update the user profile with the response data
      if (updatedData.status && updatedData.user) {
        // Extract profile picture URL from media array if present
        let profilePictureUrl = updatedData.user.profile_picture;
        if (updatedData.user.media && updatedData.user.media.length > 0) {
          // Find profile picture in media array
          const profilePicMedia = updatedData.user.media.find((media: any) => 
            media.collection_name === 'profile_picture'
          );
          if (profilePicMedia) {
            profilePictureUrl = profilePicMedia.original_url;
          }
        }
        
        // Update profile with new picture URL
        const updatedProfile = {
          ...updatedData.user,
          profile_picture: profilePictureUrl
        };
        
        setUserProfile(updatedProfile);
        
        // Also update localStorage with new user data
        localStorage.setItem('user', JSON.stringify(updatedProfile));
      } else {
        setUserProfile(prev => prev ? { ...prev, ...editForm } : null);
      }
      
      setIsEditing(false);
      setSelectedProfilePic(null);
      setProfilePicPreview(null);
      
      // Show success message
      alert('Profile updated successfully!');
      
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsSaving(false);
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
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 h-24 sm:h-32"></div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end -mt-12 sm:-mt-16">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white p-1 shadow-lg relative overflow-hidden group">
                  {(profilePicPreview || userProfile.profile_picture) ? (
                    <Image
                      src={(profilePicPreview || userProfile.profile_picture) as string}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <FaUser className="text-gray-400 text-2xl sm:text-4xl" />
                    </div>
                  )}
                  
                  {/* Profile Picture Upload Overlay (only shown when editing) */}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <label className="cursor-pointer text-white p-2 rounded-full">
                        <FaCamera className="text-lg" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePicChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>
                
                {/* Profile Picture Edit Hint */}
                {isEditing && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 text-center">
                      Hover to change photo
                    </p>
                    {selectedProfilePic && (
                      <p className="text-xs text-green-600 text-center mt-1">
                        ✓ New photo selected: {selectedProfilePic.name}
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              {/* User Info */}
              <div className="mt-6 sm:mt-0 sm:ml-6 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                      {userProfile.name || 'No name provided'}
                    </h1>
                    <p className="text-gray-600 mb-3">@{userProfile.username || 'No username'}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        userProfile.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {userProfile.status ? 'Active' : 'Inactive'}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                        {userProfile.role}
                      </span>
                    </div>
                  </div>
                  
                  {/* Edit Button */}
                  <div className="mt-4 sm:mt-0 sm:ml-4">
                    {!isEditing ? (
                      <button
                        onClick={handleEdit}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primaryred hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryred transition-colors shadow-sm"
                      >
                        <MdEdit className="mr-2" />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex space-x-3">
                        <button
                          onClick={handleSave}
                          disabled={isSaving}
                          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors shadow-sm ${
                            isSaving 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-green-600 hover:bg-green-700'
                          }`}
                        >
                          {isSaving ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <IoMdCheckmark className="mr-2" />
                              Save
                            </>
                          )}
                        </button>
                        <button
                          onClick={handleCancel}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryred transition-colors shadow-sm"
                        >
                          <MdClose className="mr-2" />
                          Cancel
                        </button>
                        {/* Debug buttons - uncomment for debugging
                        <button
                          onClick={debugProfileState}
                          className="inline-flex items-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
                        >
                          🐛 Debug
                        </button>
                        <button
                          onClick={testApiCall}
                          className="inline-flex items-center px-4 py-2 border border-purple-300 text-sm font-medium rounded-lg text-purple-700 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors shadow-sm"
                        >
                          🧪 Test API
                        </button>
                        */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FaUser className="mr-2 text-primaryred" />
              Personal Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryred focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FaUser className="text-gray-400 mr-3" />
                    <span className="text-gray-900">{userProfile.name || 'No name provided'}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryred focus:border-transparent transition-colors"
                    placeholder="Enter your username"
                  />
                ) : (
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FaUserTag className="text-gray-400 mr-3" />
                    <span className="text-gray-900">@{userProfile.username || 'No username'}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FaEnvelope className="text-gray-400 mr-3" />
                  <span className="text-gray-900">{userProfile.email || 'No email provided'}</span>
                  {userProfile.email_verified_at && (
                    <MdVerified className="text-green-500 ml-2" title="Email Verified" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.mobile}
                    onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryred focus:border-transparent transition-colors"
                    placeholder="Enter your mobile number"
                  />
                ) : (
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FaPhone className="text-gray-400 mr-3" />
                    <span className="text-gray-900">{userProfile.mobile || 'No mobile number'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FaUserTag className="mr-2 text-primaryred" />
              Account Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Role
                </label>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FaUserTag className="text-gray-400 mr-3" />
                  <span className="text-gray-900 capitalize">{userProfile.role}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Status
                </label>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    userProfile.status ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-gray-900">
                    {userProfile.status ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Member Since
                </label>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FaCalendarAlt className="text-gray-400 mr-3" />
                  <span className="text-gray-900">{formatDate(userProfile.created_at)}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Updated
                </label>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <BiTime className="text-gray-400 mr-3" />
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

        {/* Purchased Materials */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My Purchased Materials</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                {purchasedCourses.length + purchasedTestSeries.length} item{purchasedCourses.length + purchasedTestSeries.length !== 1 ? 's' : ''}
              </span>
              <button
                onClick={fetchPurchasedMaterials}
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
              <span className="ml-2 text-gray-600">Loading your materials...</span>
            </div>
          ) : (purchasedCourses.length === 0 && purchasedTestSeries.length === 0) ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No materials purchased yet</h3>
              <p className="text-gray-600 mb-4">Start your learning journey by purchasing courses or test series!</p>
              <button 
                onClick={() => window.location.href = '/course'}
                className="px-6 py-2 bg-primaryred text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <>
              {/* Purchased Courses */}
              {purchasedCourses.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Courses ({purchasedCourses.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchasedCourses.map((course, index) => (
                      <div key={`course-${index}`} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="relative mb-3">
                          <Image
                            src={course.featured_image_url || "/images/placeholder.png"}
                            alt={course.heading}
                            width={300}
                            height={160}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div className="absolute top-2 right-2">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Course
                            </span>
                          </div>
                        </div>
                        
                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {course.heading}
                        </h4>
                        
                        {course.sub_heading && (
                          <p className="text-sm text-gray-600 mb-2">{course.sub_heading}</p>
                        )}
                        
                        <div className="space-y-1 text-sm text-gray-600 mb-3">
                          {course.duration && (
                            <div className="flex items-center">
                              <BiTime className="mr-1" />
                              <span>{course.duration}</span>
                            </div>
                          )}
                          {course.video_lectures && (
                            <div className="flex items-center">
                              <span>📹 {course.video_lectures} lectures</span>
                            </div>
                          )}
                          {course.language && (
                            <div className="flex items-center">
                              <span>🌐 {course.language}</span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <span className="font-semibold text-primaryred">₹{course.price}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => window.location.href = `/course/${course.slug}`}
                            className="flex-1 bg-primaryred text-white py-2 px-3 rounded-md hover:bg-red-600 transition-colors text-sm"
                          >
                            Access Course
                          </button>
                          <button
                            onClick={() => window.location.href = `/course/${course.slug}`}
                            className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Purchased Test Series */}
              {purchasedTestSeries.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Test Series ({purchasedTestSeries.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchasedTestSeries.map((testSeries, index) => (
                      <div key={`test-${index}`} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="relative mb-3">
                          <Image
                            src={testSeries.featured_image_url || "/images/placeholder.png"}
                            alt={testSeries.heading}
                            width={300}
                            height={160}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div className="absolute top-2 right-2">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Test Series
                            </span>
                          </div>
                        </div>
                        
                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {testSeries.heading}
                        </h4>
                        
                        {testSeries.sub_heading && (
                          <p className="text-sm text-gray-600 mb-2">{testSeries.sub_heading}</p>
                        )}
                        
                        <div className="space-y-1 text-sm text-gray-600 mb-3">
                          {testSeries.duration && (
                            <div className="flex items-center">
                              <BiTime className="mr-1" />
                              <span>{testSeries.duration}</span>
                            </div>
                          )}
                          {testSeries.questions_count && (
                            <div className="flex items-center">
                              <span>❓ {testSeries.questions_count} questions</span>
                            </div>
                          )}
                          {testSeries.language && (
                            <div className="flex items-center">
                              <span>🌐 {testSeries.language}</span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <span className="font-semibold text-primaryred">₹{testSeries.price}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => window.location.href = `/test-series/${testSeries.slug}`}
                            className="flex-1 bg-primaryred text-white py-2 px-3 rounded-md hover:bg-red-600 transition-colors text-sm"
                          >
                            Start Test
                          </button>
                          <button
                            onClick={() => window.location.href = `/test-series/${testSeries.slug}`}
                            className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
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