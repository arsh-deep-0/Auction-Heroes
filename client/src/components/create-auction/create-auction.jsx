"use client";
import React, { useEffect, useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateAuction() {
  const router = useRouter();
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

  const { errors, isSubmitting, isLoading } = formState;

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

  const submit = async (data) => {
    const rulesData = {
      ...data,
      maxOverseas: 5,
      maxPlayers: data.minPlayers + 2,
      minWicketkeepers: 1,
    };

    try {
      const rulesResponse = await axios.post(
        "/api/auction-rules/create",
        rulesData
      );
      console.log("response", rulesResponse.data);
      console.log("form submitted", data);

      if (rulesResponse.data.statusCode === 201) {
        const auctionData = {
          ...data,
          auctionRulesID: rulesResponse.data.data._id,
        };
        console.log(auctionData);

        const auctionResponse = await axios.post(
          "/api/auction/create",
          auctionData
        );
        console.log(auctionResponse.data);

        if(auctionResponse.data.statusCode===201){
          router.push(`/waiting-room?roomID=${auctionResponse.data.data.auctionRoomID}`)
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
          {...register("buyersCount", {
            valueAsNumber: true,
            required: { value: true, message: "buyersCount is required" },
            min: { value: 2, message: "Teams cannot be less than 2" },
            max: { value: 2, message: "Teams cannot be more than 10" },
          })}
          className="gray-border rounded-sm"
        />
        <p className="error">{errors.buyersCount?.message}</p>

        <label htmlFor="username">Total Players in Auction</label>
        <input
          type="number"
          name="playersCount"
          id="playersCount"
          {...register("playersCount", {
            valueAsNumber: true,
            required: { value: true, message: "playersCount is required" },
            min: { value: 10, message: "Players cannot be less than 10" },
            max: { value: 100, message: "Players cannot be more than 100" },
          })}
          className="gray-border rounded-sm"
        />
        <p className="error">{errors.playersCount?.message}</p>

        <label htmlFor="username">Minimum Players in a Team</label>
        <input
          type="number"
          name="minPlayers"
          id="minPlayers"
          {...register("minPlayers", {
            valueAsNumber: true,
            required: {
              value: true,
              message: "minimum Players is required",
            },
            min: {
              value: 2,
              message: "Minimum team Players cannot be less than 2",
            },
            max: {
              value: calculatedMinPlayersInTeam,
              message: `Minimum team Players cannot be more than ${calculatedMinPlayersInTeam}`,
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
          {...register("budget", {
            valueAsNumber: true,
            required: { value: true, message: "budget is required" },
            min: { value: 25, message: "Budget cannot be less than 25" },
            max: { value: 100, message: "Budget cannot be more than 100" },
          })}
          className="gray-border rounded-sm"
        />
        <p className="error">{errors.budget?.message}</p>

        <label htmlFor="username">Minimum Bowling Members</label>
        <input
          type="number"
          name="minBowlers"
          id="minBowlers"
          {...register("minBowlers", {
            valueAsNumber: true,
            required: { value: true, message: "minimum Bowlers is required" },
            min: {
              value: 1,
              message: "Minimum bowling members cannot be less than 10",
            },
            max: {
              value: Math.min(5, calculatedMinPlayersInTeam),
              message: `Minimum bowling members cannot be more than ${Math.min(
                5,
                calculatedMinPlayersInTeam
              )}`,
            },
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
      </form>
    </div>
  );
}
