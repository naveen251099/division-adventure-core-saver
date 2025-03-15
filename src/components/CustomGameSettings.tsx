
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronRight, X } from 'lucide-react';

const formSchema = z.object({
  dividend: z.coerce.number()
    .min(10, "Dividend must be at least 10")
    .max(999, "Dividend must be less than 1000"),
  divisor: z.coerce.number()
    .min(2, "Divisor must be at least 2")
    .max(20, "Divisor must be less than 20"),
});

interface CustomGameSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (dividend: number, divisor: number) => void;
  currentDividend: number;
  currentDivisor: number;
}

const CustomGameSettings: React.FC<CustomGameSettingsProps> = ({
  open,
  onOpenChange,
  onSubmit,
  currentDividend,
  currentDivisor
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dividend: currentDividend,
      divisor: currentDivisor,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.dividend, values.divisor);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="cyber-panel border-2 border-cyber-core bg-cyber-black">
        <DialogHeader>
          <DialogTitle className="cyber-text text-center text-xl mb-4">CUSTOMIZE MISSION</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dividend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cyber-wall">Wall Strength (Dividend)</FormLabel>
                    <FormControl>
                      <input
                        type="number"
                        className="cyber-input w-full bg-cyber-dark border border-cyber-wall/30 text-white p-2 rounded-md"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="divisor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cyber-core">Power Barrels (Divisor)</FormLabel>
                    <FormControl>
                      <input
                        type="number"
                        className="cyber-input w-full bg-cyber-dark border border-cyber-core/30 text-white p-2 rounded-md"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="bg-cyber-dark border border-cyber-danger/50 text-cyber-danger hover:bg-cyber-danger/20"
              >
                <X size={16} className="mr-2" /> Cancel
              </Button>
              
              <Button 
                type="submit"
                className="bg-cyber-accent text-white hover:bg-cyber-accent/80"
              >
                <ChevronRight size={16} className="mr-2" /> Launch Mission
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomGameSettings;
