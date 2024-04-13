"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from 'universal-cookie';



export const SignUp = () => {
  const cookies = new Cookies(null, { path: '/' });
  
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      userName: "Arsh",
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;



  const submit = async (data) => {
    const form = new FormData();
    form.append("userName", data.userName);
    form.append("email", data.email);
    form.append("fullName", data.fullName);
    form.append("password", data.password);
    // form.append("profileImage", data.profileImage[0]);
    // data = { ...data, profileImage: data.profileImage[0] };
  
    try {
      const response = await axios.post(
        "/api/users/register",
        form,
        {
          withCredentials: true, 
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );
      console.log("form submitted", data);
      console.log(response.data);
      if (response.status === 201) {
        cookies.set('userID', response.data.data._id);
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="flex flex-col gap-2 p-4 w-72 text-black poppins-regular">
      <form
        className="flex flex-col gap-2 "
        onSubmit={handleSubmit(submit)}
        noValidate
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="fullName"
          id="name"
          {...register("fullName", {
            required: { value: true, message: "fullName is required" },
          })}
          className="gray-border  rounded-sm"
        />
        <p className="error">{errors.fullName?.message}</p>

        <label htmlFor="username">UserName</label>
        <input
          type="text"
          name="userName"
          id="username"
          {...register("userName", {
            required: { value: true, message: "username is required" },
          })}
          className="gray-border rounded-sm"
        />
        <p className="error">{errors.userName?.message}</p>

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          {...register("email", {
            required: { value: true, message: "email is required" },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
              message: "invalid email format",
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "arsh@gmail.com" ||
                  "This email is reserved for admin use"
                );
              },
            },
          })}
          className="gray-border rounded-sm"
        />
        <p className="error">{errors.email?.message}</p>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          {...register("password", {
            required: { value: true, message: "password is required" },
          })}
          className="gray-border  rounded-sm"
        />
        <p className="error">{errors.password?.message}</p>

        {/* <label htmlFor="profileImage">File</label>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          {...register("profileImage", {
            required: { value: true, message: "profile Image is required" },
          })}
          className="flex gap-2"
        />
        <p className="error">{errors.profileImage?.message}</p> */}
        <button
          disabled={isSubmitting}
          className="gray-border bg-blue text-white"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
