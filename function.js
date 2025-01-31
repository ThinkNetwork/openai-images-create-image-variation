window.function = async function(api_key, image, n, size, response_format, user) {
    // Validate API Key
    if (!api_key.value) {
        return "Error: OpenAI API Key is required.";
    }

    // Validate Required Parameters
    if (!image.value) {
        return "Error: Image file is required.";
    }

    // Construct request payload
    const formData = new FormData();
    formData.append("image", image.value);

    // Add optional parameters if provided
    if (n.value) formData.append("n", parseInt(n.value));
    if (size.value) formData.append("size", size.value);
    if (response_format.value) formData.append("response_format", response_format.value);
    if (user.value) formData.append("user", user.value);

    // API endpoint URL
    const apiUrl = "https://api.openai.com/v1/images/variations";

    // Make API request
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${api_key.value}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            return `Error ${response.status}: ${errorData.error?.message || "Unknown error"}`;
        }

        // Parse and return the response (list of image URLs)
        const responseData = await response.json();
        return responseData.data.map(item => item.url).join("\n");

    } catch (error) {
        return `Error: Request failed - ${error.message}`;
    }
};
