'use client'
import {useRouter} from "next/navigation";

export default function Navigation() {
    const router = useRouter()
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" onClick={async () => {
                            router.push("/")
                        }}>
                            <span className="icon">
                                <i className="fas fa-store"></i>
                            </span>
                            <span>Products</span>
                        </a>
                        <a className="navbar-item" onClick={() => router.push("/cart")}>
                            <span className="icon">
                                <i className="fas fa-shopping-cart"></i>
                            </span>
                            <span>Cart</span>
                        </a>
                        <a className="navbar-item" onClick={() => router.push("/specs")}>
                            <span className="icon">
                                <i className="fas fa-vial"></i>
                            </span>
                            <span>Spec</span>
                        </a>
                        <a className="navbar-item" onClick={() => router.push("/backoffice")}>
                            <span className="icon">
                                <i className="fas fa-cogs"></i>
                            </span>
                            <span>Backoffice</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}
