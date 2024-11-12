import React, { useState } from "react";
import { CoinbaseWalletLogo } from "./CoinbaseWalletLogo";
import { useRouter } from "next/navigation";
import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";

const buttonStyles = {
  background: "#4c1d95",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontFamily: "Arial, sans-serif",
  fontWeight: "bold",
  fontSize: "16px",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background 0.3s",
};

export default function CoinbaseButton() {
  const router = useRouter();
  const [authToken, setAuthToken] = useState(null);
  const { authenticate } = useOkto();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleGoogleLogin = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    
    try {
      authenticate(idToken, (result, error) => {
        if (result) {
          setAuthToken(result.auth_token);
          setIsAuthenticated(true);
          console.log("Authenticated successfully:", result);
          router.push('/components/auth');
        }
        if (error) {
          console.error("Authentication error:", error);
          setIsAuthenticated(false);
          setAuthToken(null);
        }
      });
    } catch (error) {
      console.error("Authentication error:", error);
      setIsAuthenticated(false);
      setAuthToken(null);
    }
  };

  async function handleDisconnect() {
    try {
      setAuthToken(null);
      setIsAuthenticated(false);
      router.push("/");
    } catch (error) {
      console.error("Error during disconnect:", error);
    }
  }

  if (isAuthenticated && authToken)
    return (
      <>
        <div className="flex items-center gap-4">
          <button 
            style={buttonStyles} 
            onClick={handleDisconnect}
          >
            <CoinbaseWalletLogo />
            <span style={{ marginLeft: "10px" }}>Disconnect</span>
          </button>
        </div>
      </>
    );

  return (
    <div>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={(error) => console.error("Login Failed", error)}
      />
    </div>
  );
}
