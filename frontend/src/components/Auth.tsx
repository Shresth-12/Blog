import { SignupType } from "@shresth12/blog-common-app";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Auth({ type }: { type: "Signup" | "Signin" }) {
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  async function SendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "Signup" ? "signup" : "signin"}`,
        postInputs // Send the form data
      );
  
      const jwt = response.data.jwt; // Extract the token from the response
  
      // Check if the token is present
      if (jwt) {
        localStorage.setItem("token", jwt);
        navigate("/blogs");
      } else {
        console.error("JWT token is not present in the response");
      }
    } catch (e) {
      console.error(e);
    }
  }
  

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="px-10">
          <div>
            <div className="text-3xl font-extrabold">
              {type === "Signup" ? "Create an account" : "Sign in to your account"}
            </div>
            <div className="text-slate-400 mt-2">
              {type === "Signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              &nbsp;
              <Link
                to={type === "Signin" ? "/signup" : "/signin"}
                className="font-bold text-slate-500 underline"
              >
                {type === "Signin" ? "Signup" : "Signin"}
              </Link>
            </div>
          </div>
          <div className="pt">
            {type === "Signup" && (
              <LabelledInput
                label="Name"
                placeholder="Shresth...."
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value
                  });
                }}
              />
            )}
            <LabelledInput
              label="Email"
              placeholder="abcd@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value
                });
              }}
            />
            <LabelledInput
              label="Password"
              placeholder="1234"
              type="password"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value
                });
              }}
            />

            <button
              onClick={SendRequest}
              type="button"
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-8"
            >
              {type === "Signup" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  type = "text",
  onChange
}: LabelledInputType) {
  return (
    <div className="mt-4">
      <label className="block mb-2 text-sm font-bold text-black">{label}</label>
      <input
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
}
