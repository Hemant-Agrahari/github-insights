"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, User, Search, Book, AlertCircle } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    owner: Yup.string()
        .required("Owner is required")
        .min(1, "Owner cannot be empty"),
    repo: Yup.string()
        .required("Repository is required")
        .min(1, "Repository cannot be empty"),
});

const RepoSearchForm = () => {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            owner: "",
            repo: "",
        },
        validationSchema,
        onSubmit: (values) => {
            router.push(`/repo/${values.owner}/${values.repo}`);
        },
    });

    return (
        <Card className="w-full max-w-md border-none shadow-xl bg-white overflow-hidden mx-auto">
            <CardHeader className="bg-slate-900 text-white p-4 pb-2 md:p-5 md:pb-3">
                <div className="flex items-center gap-3 mb-1 opacity-80">
                    <Search className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Repository Insights</span>
                </div>
                <CardTitle className="text-xl font-bold text-left">Explore GitHub</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-5 -mt-3 bg-white rounded-t-3xl relative">
                <form onSubmit={formik.handleSubmit} className="space-y-2">
                    <div className="space-y-2 text-left">
                        <label
                            htmlFor="owner"
                            className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${formik.touched.owner && formik.errors.owner ? "text-red-500" : "text-slate-500"
                                }`}
                        >
                            <User className="w-3.5 h-3.5" />
                            Owner
                        </label>
                        <div className="relative">
                            <Input
                                id="owner"
                                name="owner"
                                placeholder="e.g. vercel"
                                value={formik.values.owner}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`pl-4 h-10 bg-slate-50 transition-all rounded-xl font-medium ${formik.touched.owner && formik.errors.owner
                                    ? "border-red-300 focus:ring-red-100 bg-red-50/30"
                                    : "border-slate-200 focus:bg-white"
                                    }`}
                            />
                        </div>
                        {formik.touched.owner && formik.errors.owner && (
                            <div className="flex items-center gap-1.5 text-red-500 text-[11px] font-semibold mt-1 px-1">
                                <AlertCircle className="w-3 h-3" />
                                {formik.errors.owner}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2 text-left">
                        <label
                            htmlFor="repo"
                            className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${formik.touched.repo && formik.errors.repo ? "text-red-500" : "text-slate-500"
                                }`}
                        >
                            <Book className="w-3.5 h-3.5" />
                            Repository
                        </label>
                        <div className="relative">
                            <Input
                                id="repo"
                                name="repo"
                                placeholder="e.g. next.js"
                                value={formik.values.repo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`pl-4 h-10 bg-slate-50 transition-all rounded-xl font-medium ${formik.touched.repo && formik.errors.repo
                                    ? "border-red-300 focus:ring-red-100 bg-red-50/30"
                                    : "border-slate-200 focus:bg-white"
                                    }`}
                            />
                        </div>
                        {formik.touched.repo && formik.errors.repo && (
                            <div className="flex items-center gap-1.5 text-red-500 text-[11px] font-semibold mt-1 px-1">
                                <AlertCircle className="w-3 h-3" />
                                {formik.errors.repo}
                            </div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={!formik.isValid || formik.isSubmitting}
                        className="w-full h-10 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-slate-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        View Insights
                        <Github className="w-4 h-4" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default RepoSearchForm