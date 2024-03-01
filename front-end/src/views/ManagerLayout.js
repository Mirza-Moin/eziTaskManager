import TaskList from "../components/TaskList";
function ManagerLayout({role}) {
    return (
        <>
          <TaskList role={role}/>
        </>
    );
}

export default ManagerLayout;