import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Shield, Search, Loader2, Car, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const insuranceSchema = z.object({
  insuranceType: z.string().min(1, 'Please select an insurance type'),
  age: z.string().min(1, 'Please enter your age'),
  location: z.string().min(1, 'Please enter your location'),
  currentCoverage: z.string().optional(),
  budgetRange: z.string().min(1, 'Please select a budget range'),
  specificRequirements: z.string().optional(),
  medicalHistory: z.string().optional(),
  vehicleDetails: z.string().optional(),
});

type InsuranceFormData = z.infer<typeof insuranceSchema>;

interface InsuranceResearchFormProps {
  onSubmit: (data: InsuranceFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const INSURANCE_TYPES = [
  { value: 'health', label: 'Health Insurance', icon: Heart },
  { value: 'vehicle', label: 'Vehicle Insurance', icon: Car },
  { value: 'life', label: 'Life Insurance', icon: Shield },
  { value: 'home', label: 'Home Insurance', icon: Shield },
];

const BUDGET_RANGES = [
  { value: 'under-5000', label: 'Under ₹5,000/year' },
  { value: '5000-15000', label: '₹5,000 - ₹15,000/year' },
  { value: '15000-30000', label: '₹15,000 - ₹30,000/year' },
  { value: '30000-50000', label: '₹30,000 - ₹50,000/year' },
  { value: 'above-50000', label: 'Above ₹50,000/year' },
];

export const InsuranceResearchForm: React.FC<InsuranceResearchFormProps> = ({
  onSubmit,
  onBack,
  isLoading = false
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<InsuranceFormData>({
    resolver: zodResolver(insuranceSchema),
    mode: 'onChange'
  });

  const selectedInsuranceType = watch('insuranceType');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="bg-gradient-to-br from-slate-800/95 to-purple-900/95 backdrop-blur-md border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center">
            <Shield className="w-6 h-6 mr-3 text-purple-400" />
            Insurance Research Form
          </CardTitle>
          <p className="text-gray-300">
            Get comprehensive research on insurance options tailored to your needs and budget.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Insurance Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Insurance Type *</label>
              <Select onValueChange={(value) => setValue('insuranceType', value)}>
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select insurance type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30">
                  {INSURANCE_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="text-white hover:bg-purple-500/20">
                      <div className="flex items-center">
                        <type.icon className="w-4 h-4 mr-2" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.insuranceType && (
                <p className="text-red-400 text-sm">{errors.insuranceType.message}</p>
              )}
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Age *</label>
              <Input
                {...register('age')}
                type="number"
                placeholder="Enter your age"
                className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
              />
              {errors.age && (
                <p className="text-red-400 text-sm">{errors.age.message}</p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Location *</label>
              <Input
                {...register('location')}
                placeholder="City, State"
                className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
              />
              {errors.location && (
                <p className="text-red-400 text-sm">{errors.location.message}</p>
              )}
            </div>

            {/* Budget Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Budget Range *</label>
              <Select onValueChange={(value) => setValue('budgetRange', value)}>
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30">
                  {BUDGET_RANGES.map((range) => (
                    <SelectItem key={range.value} value={range.value} className="text-white hover:bg-purple-500/20">
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.budgetRange && (
                <p className="text-red-400 text-sm">{errors.budgetRange.message}</p>
              )}
            </div>

            {/* Current Coverage */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Current Insurance Coverage (Optional)</label>
              <Textarea
                {...register('currentCoverage')}
                placeholder="Describe your current insurance coverage, if any..."
                className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
              />
            </div>

            {/* Conditional Fields based on Insurance Type */}
            {selectedInsuranceType === 'health' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Medical History (Optional)</label>
                <Textarea
                  {...register('medicalHistory')}
                  placeholder="Any pre-existing conditions or medical history relevant to insurance..."
                  className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                />
              </div>
            )}

            {selectedInsuranceType === 'vehicle' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Vehicle Details (Optional)</label>
                <Textarea
                  {...register('vehicleDetails')}
                  placeholder="Vehicle make, model, year, and any modifications..."
                  className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                />
              </div>
            )}

            {/* Specific Requirements */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Specific Requirements (Optional)</label>
              <Textarea
                {...register('specificRequirements')}
                placeholder="Any specific coverage requirements or preferences..."
                className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                onClick={onBack}
                variant="ghost"
                className="flex-1 text-gray-400 hover:text-white"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="gradient"
                disabled={!isValid || isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Researching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Start Research
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
