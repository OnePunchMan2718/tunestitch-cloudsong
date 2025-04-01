
/**
 * Backend configuration for the CloudSong application
 * This file contains settings for API endpoints, CORS, and other backend-related configurations
 */

// Base URLs for different environments
const API_BASE_URL = {
  development: 'http://localhost:3001/api',
  production: '/api',
};

// S3 storage URLs
const STORAGE_BASE_URL = {
  development: 'http://localhost:9000',
  production: 'https://storage.yourdomain.com',
};

// CORS settings
const CORS_CONFIG = {
  origin: process.env.NODE_ENV === 'development' 
    ? ['http://localhost:8080', 'http://localhost:3000'] 
    : ['https://yourdomain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Authentication settings
const AUTH_CONFIG = {
  keycloakUrl: process.env.KEYCLOAK_URL || 'http://localhost:8080',
  keycloakRealm: process.env.KEYCLOAK_REALM || 'cloudsong',
  keycloakClientId: process.env.KEYCLOAK_CLIENT_ID || 'cloudsong-app',
  tokenRefreshInterval: 5 * 60 * 1000, // 5 minutes
};

// Database connection settings (for frontend services that need direct DB access)
const DB_CONFIG = {
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  database: process.env.POSTGRES_DB || 'cloudsong_db',
};

// File upload configurations
const UPLOAD_CONFIG = {
  maxSizeInBytes: 50 * 1024 * 1024, // 50MB
  allowedAudioFormats: ['.mp3', '.wav', '.ogg', '.flac'],
  allowedImageFormats: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  allowedProjectFormats: ['.ust', '.svp', '.vsqx'],
  storageBucket: process.env.MINIO_BUCKET || 'cloudsong-files',
};

export {
  API_BASE_URL,
  STORAGE_BASE_URL,
  CORS_CONFIG,
  AUTH_CONFIG,
  DB_CONFIG,
  UPLOAD_CONFIG,
};
