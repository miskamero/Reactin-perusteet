
const MainHeader = (props) => {
    return <h1>{props.course}</h1>;
  };
  
  const Header = (props) => {
    return <h2>{props.course}</h2>;
  };
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    );
  };
  
  const Content = (props) => {
    return (
      <div>
        {props.parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
        <Total parts={props.parts} />
      </div>
    );
  };
  
  const Total = (props) => {
    const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
    return <p>Number of exercises: {total}</p>;
  };
  
  const Course = (props) => {
    return (
      <div>
        <MainHeader course={props.header} />
        <Header course={props.name} />
        <Content parts={props.parts} />
      </div>
    );
  };
export default Course;