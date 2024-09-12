import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import DeliveryAddressForm from "../Cart/DeliveryAddressForm";
import OrderSummary from "../Cart/OrderSummary";
import PageNav from "../Navigation/PageNav";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const steps = ["Login", "Add Delivery Address", "Order Summary", "Payment"];

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);

  const step = querySearch.get("step");

  return (
    <>
      <PageNav />
      <div className="px-2 pt-5 sm:px-10 lg:p-10 bg-smoke min-h-screen font-Poppins">
        <Box
          sx={{
            width: {
              xs: "100%",
              lg: "100%", 
            },
            mx: "auto",
          }}
        >
          <Stepper
            activeStep={step}
            sx={{
              pb: 3,
              "& .MuiStepLabel-label": {
                fontSize: {
                  xs: "0.60rem",
                  sm: "1rem",
                },
              },
            }}
          >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography
                sx={{
                  mt: 2,
                  mb: 1,
                  fontSize: {
                    xs: "0.6rem",
                    sm: "1rem",
                  },
                }}
              >
                All steps completed - you&apos;re finished
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box
                sx={{
                  fontSize: {
                    xs: "0.75em",
                    sm: "1rem",
                  },
                }}
              >
                {step == 2 ? <DeliveryAddressForm /> : <OrderSummary />}
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
    </>
  );
}
