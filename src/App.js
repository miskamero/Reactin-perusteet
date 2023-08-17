const Header = (props) => {
  console.log(props);
  return (
      <h1>{props.course}</h1>
  );
};

// const Content = (props) => {
//   return (
//     <div>
//       <p>{props.parts[0].name} {props.parts[0].exercises}</p>
//       <p>{props.parts[1].name} {props.parts[1].exercises}</p>
//       <p>{props.parts[2].name} {props.parts[2].exercises}</p>
//     </div>
//   );
// };

const Part1 = (props) => {
  return (
    <p>{props.parts[0].name} {props.parts[0].exercises}</p>
  );
};

const Part2 = (props) => {
  return (
    <p>{props.parts[1].name} {props.parts[1].exercises}</p>
  );
};

const Part3 = (props) => {
  return (
    <p>{props.parts[2].name} {props.parts[2].exercises}</p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part1 parts={props.parts} />
      <Part2 parts={props.parts} />
      <Part3 parts={props.parts} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  );
};

const App = () => {
  // const-määrittelyt
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ];
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts}/>
    </div>
  )
}
// vahingossa tehty 1.1-1.5 tehtävät samalla kun tein 1.1-1.2

export default App