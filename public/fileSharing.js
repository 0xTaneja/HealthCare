"use strict";

// DOM elements
const fileInput = document.getElementById("fileInput");
const shareBtn = document.getElementById("shareBtn");
const doctorIdInput = document.getElementById("doctorId");

function showToast(msg, isError = false) {
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.padding = "10px 18px";
  toast.style.borderRadius = "6px";
  toast.style.color = "#fff";
  toast.style.zIndex = 9999;
  toast.style.backgroundColor = isError ? "#e74c3c" : "#27ae60";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 5000);
}

async function uploadFile() {
  const file = fileInput.files[0];
  const doctorId = doctorIdInput.value.trim();
  if (!file) {
    showToast("Please choose a file first", true);
    return;
  }

  shareBtn.disabled = true;
  shareBtn.textContent = "Uploading...";

  try {
    // Read file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    const payload = {
      fileName: file.name,
      mimeType: file.type,
      doctorId,
      data: base64,
    };

    const res = await fetch("/.netlify/functions/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const json = await res.json();
    if (json.error) throw new Error(json.error);

    const cid = json.cid;
    const gatewayUrl = `https://ipfs.io/ipfs/${cid}`;

    // Show success toast with link
    showToast("Uploaded successfully! Link copied to clipboard.");
    await navigator.clipboard.writeText(gatewayUrl);
  } catch (err) {
    console.error(err);
    showToast(err.message || "Upload failed", true);
  } finally {
    shareBtn.disabled = false;
    shareBtn.textContent = "Share";
  }
}

shareBtn.addEventListener("click", uploadFile); 