"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const userUrl = searchParams.get("userEmailUrl");
    const adminUrl = searchParams.get("adminEmailUrl");
    const whatsappUrl = searchParams.get("whatsappUrl");



    return (
        <div className="bg-white max-w-lg w-full rounded-2xl p-10 shadow-lg text-center border border-gray-100">

            <div className="flex justify-center mb-6">
                <CheckCircle className="text-green-500 w-20 h-20" />
            </div>

            <h1 className="text-3xl font-extrabold uppercase tracking-widest text-[#111] mb-4">
                Order Confirmed!
            </h1>

            <p className="text-gray-600 mb-8 leading-relaxed">
                Thank you for choosing Aura Sentiments. Your order has been placed successfully and is now being processed. We have sent a confirmation email with all the details to your inbox.
            </p>



            {whatsappUrl && (
                <div className="mb-8">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full h-14 bg-[#25D366] text-white font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-[#128C7E] transition-all shadow-[0_4px_20px_rgba(37,211,102,0.35)] gap-3"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                        Send Order via WhatsApp
                    </a>
                    <p className="text-xs text-gray-400 mt-2 font-medium">Click to instantly send your full order details to our team.</p>
                </div>
            )}

            {/* Demo URLs block (so user can view generated Ethereal Emails) */}
            {(userUrl || adminUrl) && (
                <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-left">
                    <h3 className="font-bold mb-2 text-gray-700">Test Emails Generated:</h3>
                    <ul className="space-y-3">
                        {userUrl && (
                            <li>
                                <p className="text-gray-500 text-xs mb-1 uppercase font-semibold">Customer Email</p>
                                <a href={userUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                                    View Customer Conformation Email
                                </a>
                            </li>
                        )}
                        {adminUrl && (
                            <li>
                                <p className="text-gray-500 text-xs mb-1 uppercase font-semibold">Admin Email</p>
                                <a href={adminUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                                    View Admin Conformation Email
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            )}

            <Link
                href="/"
                className="inline-flex items-center justify-center w-full h-14 bg-gradient-to-r from-[#c9a84c] to-[#fdb61b] text-[#111111] font-bold uppercase tracking-widest text-sm rounded-lg hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(201,168,76,0.35)]"
            >
                Continue Shopping
            </Link>
        </div>
    );
}

export default function OrderConfirmationPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans p-6 text-gray-900">
            <Suspense fallback={<div className="text-[#c9a84c] font-bold animate-pulse">Loading order details...</div>}>
                <OrderConfirmationContent />
            </Suspense>
        </div>
    );
}
