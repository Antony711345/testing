import { CustomAlert, useCustomAlert } from "../common/toast";
import { useSaveUserDetail, useUserDetailAnonomous } from "../services/hooks/user.data";
import { useState } from "react";
import type { formDetail, LeadFormProps } from "../services/user/user.interfaces";

export const LeadForm = ({ form_bg, button_style, handleClose, formFields, username, botUsername, type, sessionID }: LeadFormProps) => {
    const [formData, setFormData] = useState<formDetail[]>(formFields);
    const { mutateAsync: saveUserDetail, isPending: isSavingUserDetailPending } = useSaveUserDetail();
    const { mutateAsync: saveAnonymousDetail, isPending: isSavingAnonymousDetailPending } = useUserDetailAnonomous();
    const { alert, hideAlert, showAlert } = useCustomAlert();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        for (const field of formData) {
            if (field.required && (!field.value || (Array.isArray(field.value) && field.value.length === 0))) {
                showAlert(`Please fill the required field`, "error");
                return;
            }
            if (
                field.type === "email" &&
                field.value &&
                (typeof field.value !== "string" || !/\S+@\S+\.\S+/.test(field.value))
            ) {
                showAlert(`Please enter a valid email`, "error");
                return;
            }
            if (
                field.type === "tel" &&
                field.value &&
                (typeof field.value !== "string" || !/^\+?\d[\d\s]{9,14}$/.test(field.value))
            ) {
                showAlert(`Please enter a valid phone number`, "error");
                return;
            }
        }
        try {
            const response = await (type === "keyword" ? saveUserDetail : saveAnonymousDetail)({
                form_details: formData,
                session_id: sessionID,
                slug: username || "",
                bot_username: botUsername || "",
            });
            if (response) {
                handleClose();
                console.log("Form submitted successfully");
            }
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, "error");
            } else {
                showAlert("Failed to submit form. Please try again.", "error");
            }
        }
    };

    return (
        <div className="absolute z-[100] backdrop-blur-[2px] h-full rounded-xl md:w-full flex items-center justify-center bg-black/10 inset-0">
            <CustomAlert message={alert.message} type={alert.type} isVisible={alert.isVisible} onClose={hideAlert} />
            <div className={`rounded-lg flex flex-col md:max-w-[27rem] max-h-[25rem] w-full overflow-y-auto textAnsNo md:px-6 px-3 md:py-8 py-4 ${form_bg ? form_bg : 'bg-primaryLight'}`}>
                <div className="flex w-full items-center justify-center md:mb-6 mb-3">
                    <span className="md:text-lg font-medium text-black text-center">Lead Form</span>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                    {formData.map((field, index) => {
                        if (field.type === "radio") {
                            return (
                                <div className="flex flex-col" key={index}>
                                    <span className="text-sm font-medium text-black capitalize">
                                        {field.label} {field.required && <span className="text-red-500 text-xs">*</span>}
                                    </span>
                                    <div className="flex flex-wrap items-center gap-4 w-full">
                                        {field.options.map((option, optIndex) => (
                                            <label key={optIndex} className="flex items-center gap-2 text-black text-xs">
                                                <input
                                                    type="radio"
                                                    name={field.label}
                                                    value={option}
                                                    checked={field.value === option}
                                                    onChange={(e) => {
                                                        const newFormData = [...formData];
                                                        newFormData[index] = { ...newFormData[index], value: e.target.value };
                                                        setFormData(newFormData);
                                                    }}
                                                    className="rounded-lg outline-none text-xs"
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            );
                        }
                        if (field.type === "checkbox") {
                            return (
                                <div className="flex flex-col" key={index}>
                                    <span className="text-sm font-medium text-black capitalize">
                                        {field.label} {field.required && <span className="text-red-500 text-xs">*</span>}
                                    </span>
                                    <div className="flex flex-wrap items-center gap-5">
                                        {field.options.map((option, optIndex) => (
                                            <label key={optIndex} className="flex items-center gap-2 text-black">
                                                <input
                                                    type="checkbox"
                                                    value={option}
                                                    checked={Array.isArray(field.value) ? field.value.includes(option) : false}
                                                    onChange={(e) => {
                                                        const checked = e.target.checked;
                                                        const newFormData = [...formData];
                                                        const currentValues = Array.isArray(field.value) ? [...field.value] : [];
                                                        let updatedValues;
                                                        if (checked) {
                                                            updatedValues = [...currentValues, option];
                                                        } else {
                                                            updatedValues = currentValues.filter((v) => v !== option);
                                                        }
                                                        newFormData[index] = { ...newFormData[index], value: updatedValues };
                                                        setFormData(newFormData);
                                                    }}
                                                    className="rounded-lg outline-none text-xs"
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            );
                        }
                        // Default input/select/textarea
                        return (
                            <div key={index} className="flex flex-col gap-2">
                                <label className="text-xs font-medium text-black capitalize">
                                    {field.label} {field.required && <span className="text-red-500 text-xs">*</span>}
                                </label>
                                {(field.type !== "select" && field.type !== "textarea") && (
                                    <input
                                        type={field.type}
                                        value={field.value}
                                        onChange={(e) => {
                                            const newFormData = [...formData];
                                            newFormData[index] = { ...newFormData[index], value: e.target.value };
                                            setFormData(newFormData);
                                        }}
                                        // pattern={field.type === "tel" ? "^\\+?\\d[\\d\\s]{9,14}$" : undefined}
                                        className="rounded-lg outline-none py-2.5 px-5 text-xs placeholder:text-[#696969] border border-primary text-[#030014]"
                                        placeholder={`Enter ${field.label}`}
                                    />
                                )}
                                {field.type === "select" && (
                                    <select
                                        value={field.value}
                                        onChange={(e) => {
                                            const newFormData = [...formData];
                                            newFormData[index] = { ...newFormData[index], value: e.target.value };
                                            setFormData(newFormData);
                                        }}
                                        className="rounded-lg outline-none py-2.5 px-5 text-xs placeholder:text-[#696969] border border-primary text-[#030014]"
                                    >
                                        {field.options.map((option, optIndex) => (
                                            <option key={optIndex} value={option}>{option}</option>
                                        ))}
                                    </select>
                                )}
                                {field.type === "textarea" && (
                                    <textarea
                                        value={field.value}
                                        onChange={(e) => {
                                            const newFormData = [...formData];
                                            newFormData[index] = { ...newFormData[index], value: e.target.value };
                                            setFormData(newFormData);
                                        }}
                                        className="rounded-lg outline-none py-2.5 px-5 text-xs placeholder:text-[#696969] h-24 resize-none border border-primary text-[#030014]"
                                        placeholder={`Enter ${field.label}`}
                                    />
                                )}
                            </div>
                        );
                    })}
                    <button disabled={isSavingUserDetailPending || isSavingAnonymousDetailPending} type="submit" className={`p-2 rounded ${button_style ? button_style : 'bg-primaryLight text-white'}`}>
                        {isSavingUserDetailPending || isSavingAnonymousDetailPending ? "Saving..." : "Continue to chat"}
                    </button>
                </form>
            </div>
        </div>
    );
}