SELECT blog_posts.blog_id, blog_posts.user_id, blog_posts.post
FROM blog_posts 
JOIN likes ON blog_posts.blog_id = likes.blog_id
WHERE likes.user_id = 8;