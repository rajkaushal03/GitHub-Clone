import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import ProfileInfo from "../components/ProfileInfo";
import Spinner from "../components/Spinner";
import Repos from "../components/Repos";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import LoginPage from './LoginPage'


const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([[]]);
  const [loading,setLoading] = useState(false);
  const [sortType, setSortType] = useState('recent');
  const { authUser } = useAuthContext();

  const getUserProfileAndRepos = useCallback( async (username = authUser?.username || "rajkaushal03")=> {
    setLoading(true); // we have a loading state 
    try {
    //   const userRes = await fetch(`https://api.github.com/users/${username}`,{
    //     headers:{
    //       authorization:`token ${import.meta.env.VITE_GITHUB_API_KEY}`
    //       // authorization:`token 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`
    //     }
    // }); //data gathered

    //   const userProfile = await userRes.json(); // data stored inside json file 
    //   setUserProfile(userProfile); // data called by setuser profile  using use state hooks

    //   const repoRes = await fetch(userProfile.repos_url);
    //   const repos = await repoRes.json();

      const res =await fetch(`/api/users/profile/${username}`);
      const {repos, userProfile} = await res.json();
      setUserProfile(userProfile);

      // console.log(userProfile,'userProfile');



      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setRepos(repos);

      // console.log("userProfile: ",userProfile);
      // console.log("repos: ", repos)
      // console.log(repos[1])

      return {userProfile,repos}

    } catch (error) {
      toast.error(error.message)
    }
    finally
    {
      setLoading(false) // after everything is load it set to false
    }
  },[authUser?.username])

  useEffect(()=>{
    getUserProfileAndRepos();
  },[getUserProfileAndRepos])
  
  const onSearch = async (e,username)=>{
    e.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);


    const {userProfile,repos} = await getUserProfileAndRepos(username);

    setUserProfile(userProfile);
    setRepos(repos);
    setLoading(false);
    setSortType("recent");
  };

  const onSort = (sortType) => {
		if (sortType === "recent") {
			repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); //descending, recent first
		} else if (sortType === "stars") {
			repos.sort((a, b) => b.stargazers_count - a.stargazers_count); //descending, most stars first
		} else if (sortType === "forks") {
			repos.sort((a, b) => b.forks_count - a.forks_count); //descending, most forks first
		}
		setSortType(sortType);
		setRepos([...repos]);
	};


	return (
    <>
      {authUser ? ( // If user is authenticated, render homepage content
        <div className='m-4'>
          <Search onSearch={onSearch} />
          {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
          <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
            {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
            {!loading && <Repos repos={repos} />}
            {loading && <Spinner />}
          </div>
        </div>
      ) : ( // If user is not authenticated, render login page
        <LoginPage />
      )}
    </>
  );
};
export default HomePage
