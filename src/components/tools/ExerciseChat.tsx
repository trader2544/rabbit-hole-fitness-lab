
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp, User, Dumbbell } from "lucide-react";

type MessageType = {
  sender: "user" | "bot";
  content: string;
};

const ExerciseChat = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      sender: "bot",
      content:
        "👋 Hello! I'm your fitness assistant. I can help recommend exercises based on your goals, fitness level, and available equipment. What would you like to work on today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      sender: "user",
      content: inputMessage,
    } as MessageType;

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate bot response after a short delay
    setTimeout(() => {
      generateResponse(inputMessage);
      setIsLoading(false);
    }, 1000);
  };

  const generateResponse = (userInput: string) => {
    const normalizedInput = userInput.toLowerCase();
    let response = "";

    // Simple rule-based responses
    if (normalizedInput.includes("calisthenics")) {
      response =
        "Calisthenics is a great choice! Here are some bodyweight exercises you can try:\n\n" +
        "• Push-ups: 3 sets of 8-12 reps\n" +
        "• Pull-ups or Inverted Rows: 3 sets of 5-8 reps\n" +
        "• Bodyweight Squats: 3 sets of 15-20 reps\n" +
        "• Planks: 3 sets of 30-60 seconds\n" +
        "• Mountain Climbers: 3 sets of 30 seconds\n\n" +
        "Would you like more specific progressions for any of these exercises?";
    } else if (normalizedInput.includes("weight loss") || normalizedInput.includes("lose weight")) {
      response =
        "For weight loss, I recommend a combination of strength training and cardio. Here's a sample workout:\n\n" +
        "Strength Training (3 days/week):\n" +
        "• Squats: 3 sets of 12-15 reps\n" +
        "• Push-ups or Chest Press: 3 sets of 10-12 reps\n" +
        "• Rows or Pull-ups: 3 sets of 10-12 reps\n" +
        "• Lunges: 3 sets of 10-12 per leg\n\n" +
        "Cardio (3-5 days/week):\n" +
        "• 20-30 minutes HIIT or\n" +
        "• 30-45 minutes steady-state cardio\n\n" +
        "Remember, nutrition is key for weight loss. Would you like dietary tips as well?";
    } else if (normalizedInput.includes("muscle") || normalizedInput.includes("strength") || normalizedInput.includes("build")) {
      response =
        "To build muscle and strength, focus on progressive overload with these exercises:\n\n" +
        "Upper Body (2 days/week):\n" +
        "• Bench Press or Push-ups: 4 sets of 6-10 reps\n" +
        "• Rows or Pull-ups: 4 sets of 6-10 reps\n" +
        "• Overhead Press: 3 sets of 8-10 reps\n" +
        "• Bicep Curls: 3 sets of 10-12 reps\n" +
        "• Tricep Extensions: 3 sets of 10-12 reps\n\n" +
        "Lower Body (2 days/week):\n" +
        "• Squats: 4 sets of 6-10 reps\n" +
        "• Deadlifts: 4 sets of 6-8 reps\n" +
        "• Lunges: 3 sets of 10 per leg\n" +
        "• Calf Raises: 3 sets of 15-20 reps\n\n" +
        "Ensure you're eating in a caloric surplus with adequate protein (1.6-2g/kg of bodyweight).";
    } else if (normalizedInput.includes("cardio") || normalizedInput.includes("endurance")) {
      response =
        "To improve cardiovascular endurance, try this weekly plan:\n\n" +
        "• Monday: 30-40 minute steady-state run or bike ride (moderate intensity)\n" +
        "• Tuesday: Rest or light activity (walking, yoga)\n" +
        "• Wednesday: HIIT - 10 rounds of 30 seconds intense work, 90 seconds recovery\n" +
        "• Thursday: Rest or light activity\n" +
        "• Friday: 30-40 minute steady-state cardio with some hills or resistance\n" +
        "• Saturday: Cross-training (swimming, rowing, cycling if you usually run)\n" +
        "• Sunday: Longer session (45-60 minutes) at an easy, conversational pace\n\n" +
        "This balances high-intensity work with longer, steady-state sessions for optimal endurance gains.";
    } else if (normalizedInput.includes("beginner")) {
      response =
        "For beginners, I recommend starting with this full-body routine 3 times per week:\n\n" +
        "• Bodyweight Squats: 2-3 sets of 10-12 reps\n" +
        "• Modified Push-ups (on knees if needed): 2-3 sets of 8-10 reps\n" +
        "• Assisted Pull-ups or Inverted Rows: 2-3 sets of 6-8 reps\n" +
        "• Glute Bridges: 2-3 sets of 12-15 reps\n" +
        "• Planks: 2-3 sets of 20-30 seconds\n" +
        "• Walking or Light Jogging: 15-20 minutes\n\n" +
        "Focus on form rather than weight or reps. Rest 1-2 minutes between sets. As this gets easier, gradually increase reps, then sets, then difficulty.";
    } else if (normalizedInput.includes("home") || normalizedInput.includes("no equipment")) {
      response =
        "Here's an effective home workout with no equipment:\n\n" +
        "Circuit (repeat 3-4 times):\n" +
        "• Bodyweight Squats: 15-20 reps\n" +
        "• Push-ups (modify as needed): 10-15 reps\n" +
        "• Walking Lunges: 10-12 per leg\n" +
        "• Plank: 30-45 seconds\n" +
        "• Mountain Climbers: 30 seconds\n" +
        "• Glute Bridges: 15-20 reps\n" +
        "• Tricep Dips (using a chair/couch): 10-15 reps\n" +
        "• Superman Hold: 20-30 seconds\n\n" +
        "Rest 30-60 seconds between exercises, and 2 minutes between circuits. Do this workout 3-4 times per week.";
    } else {
      response =
        "I'd be happy to recommend exercises tailored to your needs. Could you provide more details about:\n\n" +
        "1. Your fitness goals (strength, weight loss, endurance, etc.)\n" +
        "2. Your current fitness level (beginner, intermediate, advanced)\n" +
        "3. Available equipment (gym, home workout, no equipment)\n" +
        "4. Any specific area you want to focus on (full body, upper body, core, etc.)\n" +
        "5. Any injuries or limitations I should know about";
    }

    const botMessage = {
      sender: "bot",
      content: response,
    } as MessageType;

    setMessages((prev) => [...prev, botMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle>Exercise Recommendation Chat</CardTitle>
        <CardDescription>
          Tell me your fitness goals and preferences for personalized workout recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-[500px]">
          <div className="flex-grow overflow-y-auto mb-4 p-2 bg-background rounded-lg border border-border">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {message.sender === "user" ? (
                        <User size={16} className="mr-2" />
                      ) : (
                        <Dumbbell size={16} className="mr-2" />
                      )}
                      <span className="text-xs font-medium">
                        {message.sender === "user" ? "You" : "Fitness Assistant"}
                      </span>
                    </div>
                    <div className="whitespace-pre-line text-sm">{message.content}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-secondary text-secondary-foreground">
                    <div className="flex items-center mb-1">
                      <Dumbbell size={16} className="mr-2" />
                      <span className="text-xs font-medium">
                        Fitness Assistant
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce animation-delay-200"></div>
                      <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <Input
              placeholder="Ask about exercises, routines, or specific workouts..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-grow mr-2"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              size="icon"
            >
              <ArrowUp size={18} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExerciseChat;
