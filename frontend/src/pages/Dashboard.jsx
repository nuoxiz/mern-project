import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import Spinner from "../components/Spinner";
import { fetchGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    // if not login and tried to access the dashboard, then the user will be redirected to /login
    if (!user) {
      navigate("/login");
    }
    if (user) {
      dispatch(fetchGoals());
    }

    //if you want the components to do something when they unmounts, all u need is to add a return function
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => 
             <GoalItem key={goal._id} goal={goal} />
            )}
          </div>
        ) : (
          <h3>You have no goals</h3>
        )}
      </section>
    </>
  );
};
export default Dashboard;
