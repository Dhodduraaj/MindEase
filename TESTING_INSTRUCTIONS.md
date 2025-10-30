# Testing Instructions for Face Emotion Detection

## Current Status
I've created a simplified test version of the face emotion detector to diagnose the issue.

## Steps to Test

### 1. Start the Backend
```powershell
cd e:\GitHub\MindEase\mental-health-backend
npm start
```
**Expected output:** "Server listening on http://localhost:4000"

### 2. Start the Frontend
```powershell
cd e:\GitHub\MindEase\mental-health
npm run dev
```
**Expected output:** "Local: http://localhost:5173"

### 3. Open the App
1. Open your browser (Chrome recommended)
2. Go to `http://localhost:5173`
3. Login or register if needed

### 4. Test Face Detection
1. Click on **"Face Emotion Detection"** button on the homepage
2. You should see:
   - A camera permission request popup
   - Click **"Allow"** to grant camera access
   - The video feed should appear (mirrored)
   - Status should show "Camera ready!"

### 5. Check for Errors

#### If you see a blank white page:
1. Open browser console (Press F12)
2. Look for errors in the Console tab
3. Common errors and fixes:

**Error: "Cannot read properties of undefined"**
- Solution: The component failed to load
- Check if all dependencies are installed: `npm install`

**Error: "getUserMedia is not defined"**
- Solution: Your browser doesn't support camera access
- Use Chrome, Edge, or Firefox (latest versions)
- Make sure you're using HTTPS or localhost

**Error: "Permission denied"**
- Solution: Camera access was blocked
- Click the camera icon in address bar
- Select "Always allow" for this site
- Refresh the page

**Error: "Failed to load TensorFlow"**
- Solution: TensorFlow models couldn't load
- Check your internet connection
- Clear browser cache
- Try incognito mode

#### If camera doesn't start:
1. Check if another app is using the camera
2. Close Zoom, Teams, Skype, etc.
3. Restart your browser
4. Try a different browser

#### If page is blank:
1. Check browser console for errors
2. Verify both backend and frontend are running
3. Check if you're logged in (go to /auth if not)
4. Clear browser cache and reload

### 6. Test the Simple Version
The app is currently using `FaceEmotionDetectorSimple` which:
- ✅ Tests camera access only
- ✅ No AI/TensorFlow loading
- ✅ Simulates emotion detection
- ✅ Helps diagnose if issue is camera or AI-related

### 7. Check What You Should See

**On Homepage:**
- Hero section with "Welcome to MindEase"
- Two buttons: "Take Mood Assessment" and "Face Emotion Detection"
- Features overview cards
- Quick stats section

**After clicking "Face Emotion Detection":**
- Left panel: Camera feed with controls
- Status indicator (green when ready)
- Start/Stop detection button
- Instructions panel

**After clicking "Start Detection":**
- Video feed should be active
- Status shows "Detection active"
- After 2 seconds, emotion report appears on right panel

### 8. Switching to Full AI Version

Once the simple version works, we can switch back to the full AI version:

1. Edit `Homepage.jsx`
2. Change line 144 from:
   ```jsx
   <FaceEmotionDetectorSimple ... />
   ```
   to:
   ```jsx
   <FaceEmotionDetector ... />
   ```

3. Save and the page will reload

## Common Issues & Solutions

### Issue: "Blank white page"
**Causes:**
- JavaScript error preventing render
- Missing dependencies
- Route not found
- Authentication issue

**Solutions:**
1. Open browser console (F12)
2. Look for red error messages
3. Share the error message for specific help
4. Try: `npm install` then restart dev server

### Issue: "Camera not working"
**Causes:**
- Permission denied
- Camera in use by another app
- Browser doesn't support camera
- HTTPS required (not on localhost)

**Solutions:**
1. Allow camera permission in browser
2. Close other apps using camera
3. Use Chrome/Edge/Firefox
4. Check if localhost (should work without HTTPS)

### Issue: "Detection not working"
**Causes:**
- TensorFlow failed to load
- Model download failed
- Insufficient memory
- Browser compatibility

**Solutions:**
1. Check internet connection
2. Wait for model to download (first time takes 30s)
3. Use desktop browser (mobile may have issues)
4. Try incognito mode

## Browser Compatibility

### ✅ Fully Supported:
- Chrome 90+
- Edge 90+
- Firefox 88+

### ⚠️ Limited Support:
- Safari 14+ (may have camera issues)
- Mobile browsers (performance issues)

### ❌ Not Supported:
- Internet Explorer
- Very old browser versions
- Browsers without WebGL

## Debug Checklist

- [ ] Backend is running on port 4000
- [ ] Frontend is running on port 5173
- [ ] Browser console shows no errors
- [ ] Camera permission is granted
- [ ] No other apps using camera
- [ ] Using supported browser
- [ ] Internet connection active (for AI models)
- [ ] Logged into the app

## Next Steps

1. **Test the simple version first**
   - If camera works → AI loading issue
   - If camera doesn't work → Permission/hardware issue

2. **Share console errors**
   - Open F12 → Console tab
   - Copy any red error messages
   - Share for specific diagnosis

3. **Try different browsers**
   - Chrome (recommended)
   - Edge
   - Firefox

4. **Check system**
   - Camera works in other apps?
   - Antivirus blocking camera?
   - Windows camera privacy settings?

## Contact Info

If issues persist, provide:
1. Browser name and version
2. Operating system
3. Console error messages (F12 → Console)
4. Screenshot of the blank page
5. What you see in the Network tab (F12 → Network)
