
import { Cat } from "@/_game/objects/cat/cat";

export default function HomeScreen() {
  const myCat = new Cat();

  return (
    myCat.Initiate()
  );
}

