import { useAuth } from "../../../app/hooks/useAuth";
import Button from "../../components/Button";

function Dashboard() {
  const {signOut} = useAuth();

  return (
    <div>
      <h1>Dashboard Page</h1>
      <Button onClick={signOut}>
        Sair
      </Button>
    </div>
  )
}

export default Dashboard