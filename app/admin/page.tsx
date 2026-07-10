import BottomNavigationBar from "../../components/BottomNavigationBar";
import Header from "../../components/header";
import { LoginForm } from "@/components/loginForm";

export default function Admin() {
    return (
        <>
            <Header />
            <main className="flex max-h-screen flex-col items-center justify-center text-white px-6 py-3">
                <div className="relative flex w-full max-w-3xl items-center justify-center px-5 py-12">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[rgba(45,122,77,0.08)] blur-3xl"
                    />
                    <LoginForm />
                </div>

            </main>

            <BottomNavigationBar />
        </>

    );
}