const { Pool, Client } = require("pg");

const UNIQUE_KEY_VIOLATION = "23505";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const postsQuery = `
  SELECT
  posts.image_url AS "imageUrl",
  posts.does_not_violate_terms AS "doesNotViolateTerms",
  posts.description,
  posts.date_uploaded AS "dateUploaded",
  users.email
  FROM public.posts posts
  INNER JOIN public.users users ON posts.fk_users_id = users.id;
`;

const getAllPosts = async () => {
  const client = await pool.connect();
  try {
    const res = await client.query(postsQuery);
    return res.rows;
  } finally {
    client.release();
  }
};

const addUserOp = `
  INSERT INTO public.users (email, password, fk_companies_id)
  VALUES ($1, $2, $3);
`;

const addUser = async (email, password, companyId) => {
  const client = await pool.connect();
  try {
    const res = await client.query(addUserOp, [email, password, companyId]);
    return res;
  } finally {
    client.release();
  }
};

const isUserOp = `
  SELECT * FROM public.users WHERE email = $1
`;

const isUser = async email => {
  const client = await pool.connect();
  try {
    const res = await client.query(isUserOp, [email]);
    if (!res.rows[0]) {
      return false;
    }
    const { password } = res.rows[0];
    return { email, password };
  } finally {
    client.release();
  }
};

const addAuthorizedEmailOp = `
  INSERT INTO public.authorized_emails (email, fk_companies_id)
  VALUES ($1, $2);
`;

const addAuthorizedEmail = async (email, companyId) => {
  const client = await pool.connect();
  try {
    const res = await client.query(addAuthorizedEmailOp, [email, companyId]);
    return res;
  } catch (e) {
    if (e.code === UNIQUE_KEY_VIOLATION) {
      return { error: "This email is already registered" };
    }
    console.error(e);
  } finally {
    client.release();
  }
};

const deleteAuthorizedEmailOp = `
  DELETE FROM public.authorized_emails WHERE email = $1
`;

const deleteAuthorizedEmail = async email => {
  const client = await pool.connect();
  try {
    const res = await client.query(deleteAuthorizedEmailOp, [email]);
    return res;
  } finally {
    client.release();
  }
};

const isEmailAuthorizedByCompanyQuery = `
  SELECT name, c.id
  FROM public.authorized_emails ae
  JOIN public.companies c ON ae.fk_companies_id = c.id
  WHERE ae.email = $1;
`;

const isEmailAuthorizedByCompany = async (email, companyName) => {
  const client = await pool.connect();
  try {
    const res = await client.query(isEmailAuthorizedByCompanyQuery, [email]);
    if (res.rows[0] && res.rows[0].name === companyName) {
      return { companyId: res.rows[0].id };
    }
    return false;
  } finally {
    client.release();
  }
};

module.exports = {
  getAllPosts,
  isUser,
  addUser,
  addAuthorizedEmail,
  deleteAuthorizedEmail,
  isEmailAuthorizedByCompany
};
