import { Button } from "@mui/material";
import { useRouter } from "next/dist/client/router";

const Index = () => {
  const router = useRouter();

  return (
    <div>
      <Button onClick={() => router.push("build/lessons/dynamic/select-media")}>
        Build Dynamic Lesson
      </Button>
    </div>
  );
};

export default Index;
