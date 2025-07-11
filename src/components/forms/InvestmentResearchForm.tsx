import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { TrendingUp, Search, Loader2, DollarSign, Bitcoin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const investmentSchema = z.object({
  investmentType: z.string().min(1, 'Please select an investment type'),
  riskTolerance: z.string().min(1, 'Please select your risk tolerance'),
  investmentAmount: z.string().min(1, 'Please enter your investment amount'),
  timeHorizon: z.string().min(1, 'Please select your investment time horizon'),
  experience: z.string().min(1, 'Please select your experience level'),
  goals: z.string().min(10, 'Please describe your investment goals'),
  currentPortfolio: z.string().optional(),
  specificInterests: z.string().optional(),
});

type InvestmentFormData = z.infer<typeof investmentSchema>;

interface InvestmentResearchFormProps {
  onSubmit: (data: InvestmentFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const INVESTMENT_TYPES = [
  { value: 'stocks', label: 'Stock Market', icon: TrendingUp },
  { value: 'crypto', label: 'Cryptocurrency', icon: Bitcoin },
  { value: 'mutual-funds', label: 'Mutual Funds', icon: DollarSign },
  { value: 'bonds', label: 'Bonds & Fixed Income', icon: DollarSign },
  { value: 'real-estate', label: 'Real Estate', icon: DollarSign },
  { value: 'mixed', label: 'Mixed Portfolio', icon: TrendingUp },
];

const RISK_TOLERANCE = [
  { value: 'conservative', label: 'Conservative (Low Risk)' },
  { value: 'moderate', label: 'Moderate (Medium Risk)' },
  { value: 'aggressive', label: 'Aggressive (High Risk)' },
];

const TIME_HORIZONS = [
  { value: 'short', label: 'Short Term (< 1 year)' },
  { value: 'medium', label: 'Medium Term (1-5 years)' },
  { value: 'long', label: 'Long Term (5+ years)' },
];

const EXPERIENCE_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const INVESTMENT_AMOUNTS = [
  { value: 'under-50k', label: 'Under ₹50,000' },
  { value: '50k-2l', label: '₹50,000 - ₹2,00,000' },
  { value: '2l-5l', label: '₹2,00,000 - ₹5,00,000' },
  { value: '5l-10l', label: '₹5,00,000 - ₹10,00,000' },
  { value: 'above-10l', label: 'Above ₹10,00,000' },
];

export const InvestmentResearchForm: React.FC<InvestmentResearchFormProps> = ({
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
  } = useForm<InvestmentFormData>({
    resolver: zodResolver(investmentSchema),
    mode: 'onChange'
  });

  const selectedInvestmentType = watch('investmentType');

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
            <TrendingUp className="w-6 h-6 mr-3 text-purple-400" />
            Investment Research Form
          </CardTitle>
          <p className="text-gray-300">
            Get comprehensive investment research and recommendations based on your financial goals and risk profile.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Investment Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Investment Type *</label>
              <Select onValueChange={(value) => setValue('investmentType', value)}>
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select investment type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30">
                  {INVESTMENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="text-white hover:bg-purple-500/20">
                      <div className="flex items-center">
                        <type.icon className="w-4 h-4 mr-2" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.investmentType && (
                <p className="text-red-400 text-sm">{errors.investmentType.message}</p>
              )}
            </div>

            {/* Investment Amount */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Investment Amount *</label>
              <Select onValueChange={(value) => setValue('investmentAmount', value)}>
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select investment amount range" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30">
                  {INVESTMENT_AMOUNTS.map((amount) => (
                    <SelectItem key={amount.value} value={amount.value} className="text-white hover:bg-purple-500/20">
                      {amount.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.investmentAmount && (
                <p className="text-red-400 text-sm">{errors.investmentAmount.message}</p>
              )}
            </div>

            {/* Risk Tolerance */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Risk Tolerance *</label>
              <Select onValueChange={(value) => setValue('riskTolerance', value)}>
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select your risk tolerance" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30">
                  {RISK_TOLERANCE.map((risk) => (
                    <SelectItem key={risk.value} value={risk.value} className="text-white hover:bg-purple-500/20">
                      {risk.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.riskTolerance && (
                <p className="text-red-400 text-sm">{errors.riskTolerance.message}</p>
              )}
            </div>

            {/* Time Horizon */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Investment Time Horizon *</label>
              <Select onValueChange={(value) => setValue('timeHorizon', value)}>
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select time horizon" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30">
                  {TIME_HORIZONS.map((horizon) => (
                    <SelectItem key={horizon.value} value={horizon.value} className="text-white hover:bg-purple-500/20">
                      {horizon.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.timeHorizon && (
                <p className="text-red-400 text-sm">{errors.timeHorizon.message}</p>
              )}
            </div>

            {/* Experience Level */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Experience Level *</label>
              <Select onValueChange={(value) => setValue('experience', value)}>
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30">
                  {EXPERIENCE_LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value} className="text-white hover:bg-purple-500/20">
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.experience && (
                <p className="text-red-400 text-sm">{errors.experience.message}</p>
              )}
            </div>

            {/* Investment Goals */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Investment Goals *</label>
              <Textarea
                {...register('goals')}
                placeholder="Describe your investment goals, what you want to achieve, and your financial objectives..."
                className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400 min-h-[100px]"
              />
              {errors.goals && (
                <p className="text-red-400 text-sm">{errors.goals.message}</p>
              )}
            </div>

            {/* Current Portfolio */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Current Portfolio (Optional)</label>
              <Textarea
                {...register('currentPortfolio')}
                placeholder="Describe your current investments and portfolio allocation..."
                className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
              />
            </div>

            {/* Specific Interests */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Specific Interests (Optional)</label>
              <Textarea
                {...register('specificInterests')}
                placeholder="Any specific sectors, companies, or investment themes you're interested in..."
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
