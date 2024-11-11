import React, { useState, useEffect } from "react";
import { CoinbaseWalletLogo } from "./CoinbaseWalletLogo";
import { useRouter } from "next/navigation";
import { useOkto } from 'okto-sdk-react';
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

const connectedContainerStyles = {
  display: "flex",
  alignItems: "center",
  fontFamily: "Arial, sans-serif",
  padding: "10px",
  backgroundColor: "#F0F4FF",
  borderRadius: "8px",
  color: "#333",
  fontSize: "16px",
  marginTop: "10px",
  gap: "10px",
};

const copyButtonStyles = {
  marginLeft: "10px",
  backgroundColor: "#4c1d95",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
};

export default function CoinbaseButton() {
  const router = useRouter();
  const [copySuccess, setCopySuccess] = useState("");
  const { authenticate } = useOkto();
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const handleGoogleLogin = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    
    try {
      authenticate(idToken, (result, error) => {
        if (result) {
          setAuthToken(result.auth_token);
          setIsAuthenticated(true);
          console.log("Authenticated successfully:", result);
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
      setUserDetails(null);
      router.push("/");
    } catch (error) {
      console.error("Error during disconnect:", error);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 2000);
  }

  if (isAuthenticated && authToken)
    return (
      <>
        <div style={connectedContainerStyles}>
          <button style={buttonStyles} onClick={handleDisconnect}>
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
