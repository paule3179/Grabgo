# TODO List for Phone Verification with OTP

## Completed Tasks
- [x] Install otp-generator package
- [x] Install twilio package
- [x] Update user model to include phone as required string, add otp and otpExpires fields
- [x] Add Twilio configuration and imports in userController
- [x] Implement sendOTP function in userController
- [x] Implement verifyOTP function in userController
- [x] Add send-otp and verify-otp routes in user.js

## Pending Tasks
- [ ] Set up environment variables for Twilio (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER)
- [ ] Test the OTP sending and verification functionality
- [ ] Handle phone number formatting (e.g., ensure international format for Twilio)
- [ ] Add rate limiting to OTP requests to prevent abuse
- [ ] Update registration to require phone verification before allowing login
- [ ] Add error handling for Twilio API failures

# TODO List for Profile Picture Upload

## Completed Tasks
- [x] Add Cloudinary configuration in userController
- [x] Update registerUser function to handle file upload and Cloudinary upload
- [x] Add multer middleware to registration route
- [x] Update registration route to use upload.single('profilePicture')
- [x] Modify updateUser route to support profile picture upload
- [x] Update updateUser function to handle file upload to Cloudinary
- [x] Test the profile picture update functionality

## Pending Tasks
- [ ] Set up environment variables for Cloudinary (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)
- [ ] Test the profile picture upload during registration
- [x] Add file validation (e.g., image types, size limits)
- [ ] Handle Cloudinary upload errors gracefully
- [ ] Clean up temporary uploaded files after Cloudinary upload
- [ ] Test the profile picture update functionality

# TODO List for Adding Restaurants

## Completed Tasks
- [x] Create Restaurant model (models/Restaurant.js)
- [x] Create restaurant controller (controllers/restaurantController.js)
- [x] Create restaurant routes (routes/restaurants.js)
- [x] Integrate restaurant routes into app.js
- [x] Update TODO.md with restaurant tasks
