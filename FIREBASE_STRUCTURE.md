# Firebase Realtime Database Structure

## Profile Data

The actor's profile information is stored at the root level under `profile`:

```json
{
  "profile": {
    "name": "John Doe",
    "age": "28",
    "height": "5'11\"",
    "email": "john@example.com",
    "phone": "+1 234 567 890",
    "imageUrl": "https://example.com/profile.jpg",
    "social": {
      "instagram": "https://instagram.com/johndoe",
      "facebook": "https://facebook.com/johndoe",
      "twitter": "https://twitter.com/johndoe",
      "linkedin": "https://linkedin.com/in/johndoe"
    }
  }
}
```

## User Roles

Admin user roles are stored under `user_roles`:

```json
{
  "user_roles": {
    "USER_UID": {
      "role": "admin",
      "email": "admin@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

This document outlines the database structure for your actor portfolio website.

## Database Structure

Your Firebase Realtime Database should follow this structure:

```json
{
  "gallery": {
    "image1": {
      "url": "https://your-image-url.com/image1.jpg",
      "alt": "Description of the image",
      "order": 1
    },
    "image2": {
      "url": "https://your-image-url.com/image2.jpg",
      "alt": "Another image description",
      "order": 2
    }
  },
  "works": {
    "work1": {
      "title": "Short Film: The Last Light",
      "category": "Short Film",
      "year": "2024",
      "role": "Lead Actor",
      "description": "A compelling drama about finding hope in darkness",
      "order": 1
    },
    "work2": {
      "title": "Commercial: Brand Name",
      "category": "Advertisement",
      "year": "2023",
      "role": "Featured Actor",
      "description": "High-energy commercial for a lifestyle brand",
      "order": 2
    }
  },
  "videos": {
    "video1": {
      "title": "Showreel 2024",
      "embedUrl": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
      "description": "A compilation of my best performances",
      "order": 1
    },
    "video2": {
      "title": "Behind the Scenes",
      "embedUrl": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
      "description": "Exclusive behind-the-scenes footage",
      "order": 2
    }
  }
}
```

## Field Descriptions

### Gallery Images
- **url**: Direct URL to the image (can use Firebase Storage URLs)
- **alt**: Alternative text for accessibility
- **order**: Number to control display order (optional)

### Works
- **title**: Project title
- **category**: Type of work (e.g., "Short Film", "Diploma Film", "Advertisement")
- **year**: Year of production
- **role**: Your role in the project
- **description**: Brief description of the work
- **order**: Number to control display order (optional)

### Videos
- **title**: Video title
- **embedUrl**: YouTube embed URL (format: https://www.youtube.com/embed/VIDEO_ID)
- **description**: Video description
- **order**: Number to control display order (optional)

## How to Add Data

### Using Firebase Console

1. Go to your Firebase Console: https://console.firebase.google.com/
2. Select your project: `pq-hub-906ed`
3. Navigate to "Realtime Database" in the left sidebar
4. Click on the database URL or the "Data" tab
5. Click the "+" icon to add data
6. Follow the structure above

### Adding Images from Firebase Storage

1. Go to "Storage" in Firebase Console
2. Upload your images
3. Click on an uploaded image
4. Copy the download URL
5. Use this URL in the `gallery` section of your database

### YouTube Video Embed URLs

To get the embed URL for YouTube videos:
1. Go to your YouTube video
2. Click "Share" → "Embed"
3. Copy the URL from the `src` attribute (looks like: `https://www.youtube.com/embed/VIDEO_ID`)
4. Use this URL in the `embedUrl` field

## Security Rules (Optional)

For a read-only public portfolio, use these rules:

```json
{
  "rules": {
    "gallery": {
      ".read": true,
      ".write": "auth != null"
    },
    "works": {
      ".read": true,
      ".write": "auth != null"
    },
    "videos": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

This allows anyone to read the data but only authenticated users to write.

## Fallback Behavior

The website will display placeholder content if:
- Firebase database is empty
- There's a connection error
- Data fails to load

Once you add data to Firebase, it will automatically replace the placeholder content.
