import { SignUp } from "@clerk/nextjs";

export default function Cadastrar() {
  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2">
        <SignUp />;
      </div>
    </>
  );
}
