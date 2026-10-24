"use client";

import {
  ArrowLeft,
  CalendarDays,
  CarFront,
  CheckCircle2,
  LoaderCircle,
  MapPin,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";

type RepairFormData = {
  vehicleBrand: string;
  vehicleModel: string;
  registrationNumber: string;
  problemCategory: string;
  description: string;
  preferredDate: string;
  location: string;
};

const INITIAL_FORM: RepairFormData = {
  vehicleBrand: "",
  vehicleModel: "",
  registrationNumber: "",
  problemCategory: "",
  description: "",
  preferredDate: "",
  location: "",
};

const PROBLEM_CATEGORIES = [
  "Engine",
  "Brakes",
  "AC",
  "Battery",
  "Tires",
  "Electrical",
  "Maintenance",
  "Other",
] as const;

export default function RepairRequestPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const mechanicId = params.id;

  const [formData, setFormData] = useState<RepairFormData>(INITIAL_FORM);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Use the browser's local calendar date for the date input.
  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");
    setSuccess("");

    if (!mechanicId) {
      setError(
        "Mechanic ID is missing. Please return to the mechanic profile and try again.",
      );
      return;
    }

    if (
      !formData.vehicleBrand.trim() ||
      !formData.vehicleModel.trim() ||
      !formData.problemCategory ||
      !formData.description.trim() ||
      formData.description.trim().length < 10 ||
      !formData.preferredDate ||
      !formData.location.trim()
    ) {
      setError(
        "Please complete all required fields. The problem description must be at least 10 characters.",
      );
      return;
    }

    if (
      !(PROBLEM_CATEGORIES as readonly string[]).includes(
        formData.problemCategory,
      )
    ) {
      setError("Please select a valid repair category.");
      return;
    }

    if (formData.preferredDate < minDate) {
      setError("Please choose today or a future date.");
      return;
    }

    setIsSubmitting(true);

    try {
      // This Next.js route verifies the customer's session and forwards
      // the request to the Express backend.
      const response = await fetch("http://localhost:5000/repair-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mechanicId,
          vehicleBrand: formData.vehicleBrand.trim(),
          vehicleModel: formData.vehicleModel.trim(),
          registrationNumber: formData.registrationNumber.trim(),
          problemCategory: formData.problemCategory,
          description: formData.description.trim(),
          preferredDate: formData.preferredDate,
          location: formData.location.trim(),
        }),
      });

      const result: { message?: string; requestId?: string } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to submit your repair request.",
        );
      }

      setSuccess(
        result.message || "Your repair request was submitted successfully.",
      );

      setIsSubmitted(true);
      setFormData(INITIAL_FORM);

      setSuccess(
        result.message || "Your repair request was submitted successfully.",
      );
      setFormData(INITIAL_FORM);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/mechanics/${mechanicId}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-orange-600"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to mechanic
        </Link>

        <header className="mb-8">
          <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <Wrench size={25} aria-hidden="true" />
          </div>

          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-orange-600">
            FixMyRide · Service request
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Request a repair
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Tell the mechanic about your vehicle, explain the issue, and choose
            a convenient date and service location.
          </p>

          <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
            <CarFront
              size={18}
              className="shrink-0 text-orange-600"
              aria-hidden="true"
            />
            <span>Mechanic ID:</span>
            <span className="break-all font-semibold text-slate-800">
              {mechanicId}
            </span>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
        >
          <section aria-labelledby="vehicle-heading">
            <div className="mb-5">
              <h2
                id="vehicle-heading"
                className="text-lg font-bold text-slate-900"
              >
                Vehicle information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Enter the details of the vehicle that needs service.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="vehicleBrand"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Vehicle brand <span className="text-red-500">*</span>
                </label>
                <input
                  id="vehicleBrand"
                  name="vehicleBrand"
                  value={formData.vehicleBrand}
                  onChange={handleChange}
                  placeholder="e.g. Toyota"
                  required
                  maxLength={60}
                  autoComplete="off"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <div>
                <label
                  htmlFor="vehicleModel"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Vehicle model <span className="text-red-500">*</span>
                </label>
                <input
                  id="vehicleModel"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  placeholder="e.g. Corolla 2022"
                  required
                  maxLength={80}
                  autoComplete="off"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="registrationNumber"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Registration number{" "}
                  <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="e.g. DHAKA METRO-GA-123456"
                  maxLength={30}
                  autoComplete="off"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />
              </div>
            </div>
          </section>

          <div className="border-t border-slate-100" />

          <section aria-labelledby="repair-heading">
            <div className="mb-5">
              <h2
                id="repair-heading"
                className="text-lg font-bold text-slate-900"
              >
                Repair details
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Describe the issue so the mechanic can understand what you need.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="problemCategory"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Problem category <span className="text-red-500">*</span>
                </label>
                <select
                  id="problemCategory"
                  name="problemCategory"
                  value={formData.problemCategory}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                >
                  <option value="">Select a problem</option>
                  <option value="Engine">Engine problem</option>
                  <option value="Brakes">Brake problem</option>
                  <option value="AC">AC problem</option>
                  <option value="Battery">Battery problem</option>
                  <option value="Tires">Tire or wheel problem</option>
                  <option value="Electrical">Electrical problem</option>
                  <option value="Maintenance">General maintenance</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Describe the problem <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs text-slate-400">
                    {formData.description.length}/1500
                  </span>
                </div>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Explain what happened, when it started, and what needs to be repaired..."
                  required
                  minLength={10}
                  maxLength={1500}
                  rows={5}
                  className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Please provide at least 10 characters.
                </p>
              </div>
            </div>
          </section>

          <div className="border-t border-slate-100" />

          <section aria-labelledby="schedule-heading">
            <div className="mb-5">
              <h2
                id="schedule-heading"
                className="text-lg font-bold text-slate-900"
              >
                Service schedule
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Tell the mechanic when and where you would like the service.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="preferredDate"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
                >
                  <CalendarDays size={17} aria-hidden="true" />
                  Preferred date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={minDate}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
                >
                  <MapPin size={17} aria-hidden="true" />
                  Service location <span className="text-red-500">*</span>
                </label>
                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Mirpur, Dhaka"
                  required
                  maxLength={200}
                  autoComplete="street-address"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />
              </div>
            </div>
          </section>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              role="status"
              className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
            >
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold">Request submitted</p>
                <p className="mt-1">{success}</p>
                <button
                  type="button"
                  onClick={() => router.push("/dashboard/user")}
                  className="mt-3 font-semibold underline underline-offset-4 hover:text-green-950"
                >
                  Go to my dashboard
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Submitting request..."
                : isSubmitted
                  ? "Request Submitted ✓"
                  : "Submit Repair Request"}
            </button>
            <p className="text-center text-xs leading-5 text-slate-500">
              Your request will be sent to the selected mechanic for review.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
