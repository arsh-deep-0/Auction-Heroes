"use client";
import React, { useEffect, useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
export default function CreateAuction() {
  const form = useForm({
    defaultValues: {
      buyersCount: 2,
      minPlayers: 11,
      playersCount: 24,
      budget: 80,
      minBowlers: 5,
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
  } = form;

  const { errors, isSubmitted, isSubmitting, isSubmitSuccessful, isLoading } =
    formState;

  const totalPlayersValue = watch("playersCount");
  const teamsCountValue = watch("buyersCount");
  const minPlayersValue = watch("minPlayers");
  const calculatedMinPlayersInTeam = parseInt(
    Math.min(totalPlayersValue / teamsCountValue - 1, 11)
  );
  useEffect(() => {
    if (calculatedMinPlayersInTeam < minPlayersValue)
      setValue("minPlayers", calculatedMinPlayersInTeam);
  }, [teamsCountValue, totalPlayersValue]);

  console.log("isSubmitting: ", isSubmitting);

  const submit = (data) => {
    for (let i = 0; i < 10000000000; i++) {
      if (i == 99999999) {
        console.log(i);
      }
    }
    console.log("form submitted", data);
  };

  const onError = (errors) => {
    console.log("Error: ", errors);
  };

  return (
    <div className="flex flex-col gap-2 p-4 w-72 text-black poppins-regular">
      <form
        className="flex flex-col gap-2 "
        onSubmit={handleSubmit(submit, onError)}
        noValidate
      >
        <label htmlFor="name">Auction Name</label>
        <input
          type="text"
          name="auctionName"
          id="name"
          {...register("auctionName", {
            required: { value: true, message: "auctionName is required" },
          })}
          className="gray-border  rounded-sm"
        />
        <p className="error">{errors.auctionName?.message}</p>
        <label htmlFor="username">Number of Teams</label>
        <input
          type="number"
          name="buyersCount"
          id="buyersCount"
          max={10}
          min={2}
          {...register("buyersCount", {
            valueAsNumber: true,
            required: { value: true, message: "buyersCount is required" },
            validate: {
              maxBuyers: (fieldValue) => {
                return fieldValue <= 10 || "Total Teams cannot be more than 10";
              },
            },
          })}
          className="gray-border rounded-sm"
        />
        <p className="error">{errors.buyersCount?.message}</p>

        <label htmlFor="username">Total Players in Auction</label>
        <input
          type="number"
          name="playersCount"
          id="playersCount"
          max={100}
          min={10}
          {...register("playersCount", {
            valueAsNumber: true,
            required: { value: true, message: "playersCount is required" },
            validate: {
              maxPlayers: (fieldValue) => {
                return (
                  fieldValue <= 100 || "Total Players cannot be more than 100"
                );
              },
            },
          })}
          className="gray-border rounded-sm"
        />
        <p className="error">{errors.playersCount?.message}</p>

        <label htmlFor="username">Minimum Players in a Team</label>
        <input
          type="number"
          name="minPlayers"
          id="minPlayers"
          max={calculatedMinPlayersInTeam}
          min={2}
          {...register("minPlayers", {
            valueAsNumber: true,
            required: {
              value: true,
              message: "minimum dcqPlayers is required",
            },
          })}
          className="gray-border rounded-sm"
        />
        <p className="error">{errors.minPlayers?.message}</p>

        <label htmlFor="username">Budget</label>
        <input
          type="number"
          name="budget"
          id="budget"
          max={10}
          min={2}
          {...register("budget", {
            valueAsNumber: true,
            required: { value: true, message: "budget is required" },
          })}
          className="gray-border rounded-sm"
        />
        <p className="error">{errors.budget?.message}</p>

        <label htmlFor="username">Minimum Bowling Members</label>
        <input
          type="number"
          name="minBowlers"
          id="minBowlers"
          max={5}
          min={2}
          {...register("minBowlers", {
            valueAsNumber: true,
            required: { value: true, message: "minimum Bowlers is required" },
          })}
          className="gray-border rounded-sm"
        />
        <p className="error">{errors.minBowlers?.message}</p>

        <label htmlFor="username">Auction Date</label>
        <input
          type="date"
          name="date"
          id="date"
          {...register("date", {
            valueAsDate: true,
            required: { value: true, message: "Date is required" },
          })}
          className="gray-border rounded-sm"
        />
        <p className="error">{errors.date?.message}</p>

        <button
          disabled={isSubmitting}
          className="gray-border bg-blue text-white disabled:bg-gray-500"
        >
          Sign Up
        </button>
        <p className="text-black">{isSubmitting?'true':'false'}</p>
      </form>
    </div>
  );
}
