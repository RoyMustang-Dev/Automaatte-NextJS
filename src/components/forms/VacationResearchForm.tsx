import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, Search, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const vacationSchema = z.object({
  country: z.string().min(1, 'Please select a country'),
  state: z.string().min(1, 'Please select a state'),
  city: z.string().optional(),
  specificPlace: z.string().optional(),
});

type VacationFormData = z.infer<typeof vacationSchema>;

interface VacationResearchFormProps {
  onSubmit: (data: VacationFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export const VacationResearchForm: React.FC<VacationResearchFormProps> = ({
  onSubmit,
  onBack,
  isLoading = false
}) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<VacationFormData>({
    resolver: zodResolver(vacationSchema),
    mode: 'onChange'
  });

  const selectedCountry = watch('country');
  const selectedState = watch('state');

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countryNames = data.map((country: any) => country.name.common).sort();
        setCountries(countryNames);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (selectedCountry) {
      setLoadingStates(true);
      const fetchStates = async () => {
        try {
          const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country: selectedCountry })
          });
          const data = await response.json();
          if (data.data && data.data.states) {
            setStates(data.data.states.map((state: any) => state.name));
          }
        } catch (error) {
          console.error('Failed to fetch states:', error);
        } finally {
          setLoadingStates(false);
        }
      };
      fetchStates();
      setValue('state', '');
      setValue('city', '');
      setCities([]);
    }
  }, [selectedCountry, setValue]);

  // Fetch cities when state changes
  useEffect(() => {
    if (selectedCountry && selectedState) {
      setLoadingCities(true);
      const fetchCities = async () => {
        try {
          const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country: selectedCountry, state: selectedState })
          });
          const data = await response.json();
          if (data.data) {
            setCities(data.data);
          }
        } catch (error) {
          console.error('Failed to fetch cities:', error);
        } finally {
          setLoadingCities(false);
        }
      };
      fetchCities();
      setValue('city', '');
    }
  }, [selectedCountry, selectedState, setValue]);

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
            <MapPin className="w-6 h-6 mr-3 text-purple-400" />
            Vacation Research Form
          </CardTitle>
          <p className="text-gray-300">
            Tell us about your dream destination and we'll provide comprehensive research to help you plan the perfect trip.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Country Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Country *</label>
              <Select onValueChange={(value) => setValue('country', value)}>
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30">
                  {countries.map((country) => (
                    <SelectItem key={country} value={country} className="text-white hover:bg-purple-500/20">
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-red-400 text-sm">{errors.country.message}</p>
              )}
            </div>

            {/* State Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">State/Province *</label>
              <Select 
                onValueChange={(value) => setValue('state', value)}
                disabled={!selectedCountry || loadingStates}
              >
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder={loadingStates ? "Loading states..." : "Select a state"} />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30">
                  {states.map((state) => (
                    <SelectItem key={state} value={state} className="text-white hover:bg-purple-500/20">
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && (
                <p className="text-red-400 text-sm">{errors.state.message}</p>
              )}
            </div>

            {/* City Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">City (Optional)</label>
              <Select 
                onValueChange={(value) => setValue('city', value)}
                disabled={!selectedState || loadingCities}
              >
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder={loadingCities ? "Loading cities..." : "Select a city"} />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30">
                  {cities.map((city) => (
                    <SelectItem key={city} value={city} className="text-white hover:bg-purple-500/20">
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Specific Place */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Specific Place or Landmark (Optional)</label>
              <Input
                {...register('specificPlace')}
                placeholder="e.g., Times Square, Eiffel Tower, Beach Resort"
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
