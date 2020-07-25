import axios from "axios";

const getGithubUser = async (name: string) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${name}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export default getGithubUser;
