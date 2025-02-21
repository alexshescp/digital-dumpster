
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Mail, Download, Server, Info } from "lucide-react";

interface StorageOption {
  duration: string;
  price: number;
  size: string;
}

const storageOptions: StorageOption[] = [
  { duration: "24 hours", price: 0, size: "Any size" },
  { duration: "7 days", price: 1, size: "Up to 10GB" },
  { duration: "7 days", price: 3, size: "Up to 500GB" },
  { duration: "30 days", price: 3, size: "Up to 10GB" },
  { duration: "30 days", price: 9, size: "Up to 500GB" },
];

export const EmailDumpForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    server: '',
    email: '',
    password: '',
    startDate: '',
    endDate: '',
  });
  const [step, setStep] = useState(1);
  const [connecting, setConnecting] = useState(false);
  const [storageOption, setStorageOption] = useState("24 hours");
  const [deliveryMethod, setDeliveryMethod] = useState("email");
  const [progress, setProgress] = useState(0);
  const [estimatedSize, setEstimatedSize] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkConnection = async (e: React.FormEvent) => {
    e.preventDefault();
    setConnecting(true);
    setProgress(0);
    
    // Simulate connection check and size estimation
    try {
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      setEstimatedSize(Math.random() * 50); // Simulated size in GB
      setStep(2);
      toast({
        title: "Connection successful",
        description: "Email server connected successfully.",
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  const startDownload = () => {
    toast({
      title: "Download started",
      description: "Your email dump is being prepared.",
    });
    // Implement actual download logic here
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card className="p-6 glass-panel space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Email Backup Tool</h1>
          <p className="text-muted-foreground">
            Securely backup and download your email data
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={checkConnection} className="space-y-6 fade-in">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="server">IMAP Server</Label>
                <Input
                  id="server"
                  name="server"
                  placeholder="imap.gmail.com"
                  value={formData.server}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Your password or app password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={connecting}
            >
              {connecting ? (
                <>
                  <Server className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Check Connection"
              )}
            </Button>

            {connecting && (
              <Progress value={progress} className="w-full" />
            )}
          </form>
        )}

        {step === 2 && (
          <div className="space-y-6 fade-in">
            {estimatedSize && (
              <div className="rounded-lg bg-secondary p-4 flex items-center space-x-2">
                <Info className="h-5 w-5 text-primary" />
                <span>Estimated size: {estimatedSize.toFixed(2)} GB</span>
              </div>
            )}

            <div className="space-y-4">
              <Label>Storage Duration</Label>
              <RadioGroup
                value={storageOption}
                onValueChange={setStorageOption}
                className="grid grid-cols-1 gap-2"
              >
                {storageOptions.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 rounded-lg border p-4 card-hover"
                  >
                    <RadioGroupItem value={option.duration} id={`storage-${index}`} />
                    <Label htmlFor={`storage-${index}`} className="flex-1">
                      <div className="flex justify-between items-center">
                        <span>{option.duration}</span>
                        <span className="text-primary font-semibold">
                          {option.price === 0 ? "Free" : `$${option.price}`}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">{option.size}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>Delivery Method</Label>
              <RadioGroup
                value={deliveryMethod}
                onValueChange={setDeliveryMethod}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 rounded-lg border p-4 card-hover">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 rounded-lg border p-4 card-hover">
                  <RadioGroupItem value="telegram" id="telegram" />
                  <Label htmlFor="telegram" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Telegram</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              onClick={startDownload}
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Start Download
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
