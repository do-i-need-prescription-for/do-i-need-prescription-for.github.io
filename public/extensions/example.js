console.log("Drugs parser loaded");

// Ctrl + Shift + Y
document.body.addEventListener("keydown", (event) => {
    // Y is for English, Н is for Ukrainian
    if (event.ctrlKey && event.shiftKey && (event.key === "Y" || event.key === "Н")) {
        const data = JSON.stringify({
            url: window.location.href,
            countries: ["ukraine", "usa"],
            allowedDrugs: ["Lisdexamfetamine", "Mixed Amphetamine Salts"],
            prescriptionDrugs: ["Methylphenidate"],
            bannedDrugs: ["Cocaine", "Diamorphine"],
            updatedAt: new Date().toISOString()
        });

        navigator.clipboard.writeText(data)
            .then(() => console.log("Page info copied to clipboard:", data))
            .catch((err) => console.error("Failed to copy page info:", err));
    }
});
