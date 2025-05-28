<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ArticleController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\TagController;
use App\Http\Controllers\API\CommentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Test endpoint
Route::get('/test', function() {
    return response()->json([
        'status' => 'success',
        'message' => 'API connection successful'
    ]);
});

// Public Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/auth-test', function() {
        return response()->json([
            'status' => 'success',
            'message' => 'Authentication successful',
            'user' => auth()->user()
        ]);
    });
});

// Public Article Routes
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{slug}', [ArticleController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{slug}', [CategoryController::class, 'show']);
Route::get('/tags', [TagController::class, 'index']);
Route::get('/tags/{slug}', [TagController::class, 'show']);

// Public test endpoint
Route::get('/test', function() {
    return response()->json([
        'status' => 'success',
        'message' => 'API connection successful',
        'timestamp' => now()
    ]);
});

// Protected test endpoint
Route::middleware('auth:sanctum')->get('/auth-test', function(Request $request) {
    return response()->json([
        'status' => 'success',
        'message' => 'Authentication successful',
        'user' => $request->user()
    ]);
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::put('/update-profile', [AuthController::class, 'updateProfile']);
    Route::put('/update-password', [AuthController::class, 'updatePassword']);
    Route::delete('/delete-account', [AuthController::class, 'deleteAccount']);
    Route::get('/user-articles', [ArticleController::class, 'userArticles']);
    Route::get('/user-comments', [CommentController::class, 'userComments']);
    Route::get('/user-favorites', [ArticleController::class, 'userFavorites']);
    Route::post('/favorite/{article}', [ArticleController::class, 'favorite']);
    Route::delete('/unfavorite/{article}', [ArticleController::class, 'unfavorite']);
    Route::get('/user-articles/{slug}', [ArticleController::class, 'userArticle']);
    Route::get('/user-comments/{id}', [CommentController::class, 'userComment']);
    Route::get('/user-favorites/{slug}', [ArticleController::class, 'userFavorite']);
    Route::get('/user-articles/{slug}/comments', [CommentController::class, 'userArticleComments']);
    Route::get('/user-comments/{id}/articles', [ArticleController::class, 'userCommentArticles']);
    Route::get('/user-favorites/{slug}/articles', [ArticleController::class, 'userFavoriteArticles']);
    Route::get('/user-articles/{slug}/tags', [TagController::class, 'userArticleTags']);
    Route::get('/user-comments/{id}/tags', [TagController::class, 'userCommentTags']);
    Route::get('/user-favorites/{slug}/tags', [TagController::class, 'userFavoriteTags']);
    Route::get('/user-articles/{slug}/categories', [CategoryController::class, 'userArticleCategories']);
    Route::get('/user-comments/{id}/categories', [CategoryController::class, 'userCommentCategories']);
    Route::get('/user-favorites/{slug}/categories', [CategoryController::class, 'userFavoriteCategories']);
    Route::get('/user-articles/{slug}/comments', [CommentController::class, 'userArticleComments']);


    // Admin and Editor routes
    Route::middleware('role:editor,admin')->group(function () {
        Route::post('/tags', [TagController::class, 'store']);
        Route::put('/tags/{slug}', [TagController::class, 'update']);
        Route::delete('/tags/{slug}', [TagController::class, 'destroy']);
        
        // Comment moderation
        Route::put('/comments/{comment}/moderate', [CommentController::class, 'moderate']);
    });

    // Comment routes
    Route::get('/articles/{article}/comments', [CommentController::class, 'index']);
    Route::post('/articles/{article}/comments', [CommentController::class, 'store']);
    Route::put('/comments/{comment}', [CommentController::class, 'update']);
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);
});