const { Pool, Client } = require("pg");

const connectionString =
  "postgres://xvijmuis:JdUiBm6EfRZqeI3m2glnnl6TyoRQflLW@horton.elephantsql.com:5432/xvijmuis";

const pool = new Pool({
  connectionString: connectionString
});

const postsQuery = `
SELECT
 public.posts.image_url as "imageUrl",
 public.posts.does_not_violate_terms as "doesNotViolateTerms",
 public.posts.description,
 public.posts.date_uploaded as "dateUploaded",
 public.users.email
FROM public.posts
INNER join public.users ON public.posts.user_fk = public.users.id;
`;

const getPosts = async () => {
  const client = await pool.connect();
  try {
    const res = await client.query(postsQuery);
    return res.rows;
  } finally {
    client.release();
  }
};

module.exports = {
  getPosts
};
