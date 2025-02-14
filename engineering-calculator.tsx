"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EngineeringCalculator() {
  const [calculatorDisplay, setCalculatorDisplay] = useState("0")
  const [convertFrom, setConvertFrom] = useState("m")
  const [convertTo, setConvertTo] = useState("m")
  const [convertValue, setConvertValue] = useState("0")
  const [convertResult, setConvertResult] = useState("0")

  const calculatorButtons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
    "C",
    "←",
    "^",
    "√",
  ]

  const handleCalculatorClick = (value: string) => {
    if (value === "C") {
      setCalculatorDisplay("0")
    } else if (value === "←") {
      setCalculatorDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"))
    } else if (value === "=") {
      try {
        setCalculatorDisplay(eval(calculatorDisplay).toString())
      } catch (error) {
        setCalculatorDisplay("Error")
      }
    } else if (value === "^") {
      setCalculatorDisplay((prev) => `${prev}**`)
    } else if (value === "√") {
      setCalculatorDisplay((prev) => `Math.sqrt(${prev})`)
    } else {
      setCalculatorDisplay((prev) => (prev === "0" ? value : prev + value))
    }
  }

  const handleConvert = () => {
    const conversionFactors: { [key: string]: number } = {
      m: 1,
      cm: 0.01,
      mm: 0.001,
      km: 1000,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.34,
    }

    const fromFactor = conversionFactors[convertFrom]
    const toFactor = conversionFactors[convertTo]
    const result = (Number.parseFloat(convertValue) * fromFactor) / toFactor
    setConvertResult(result.toFixed(6))
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">Calculadora</TabsTrigger>
          <TabsTrigger value="converter">Conversor</TabsTrigger>
        </TabsList>
        <TabsContent value="calculator">
          <div className="grid gap-4">
            <Input value={calculatorDisplay} readOnly className="text-right text-2xl font-bold" />
            <div className="grid grid-cols-4 gap-2">
              {calculatorButtons.map((btn) => (
                <Button
                  key={btn}
                  onClick={() => handleCalculatorClick(btn)}
                  variant={["C", "←", "^", "√"].includes(btn) ? "secondary" : "default"}
                >
                  {btn}
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="converter">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="convertFrom">De</Label>
                <Select value={convertFrom} onValueChange={setConvertFrom}>
                  <SelectTrigger id="convertFrom">
                    <SelectValue placeholder="Selecione a unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m">Metro (m)</SelectItem>
                    <SelectItem value="cm">Centímetro (cm)</SelectItem>
                    <SelectItem value="mm">Milímetro (mm)</SelectItem>
                    <SelectItem value="km">Quilômetro (km)</SelectItem>
                    <SelectItem value="in">Polegada (in)</SelectItem>
                    <SelectItem value="ft">Pé (ft)</SelectItem>
                    <SelectItem value="yd">Jarda (yd)</SelectItem>
                    <SelectItem value="mi">Milha (mi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="convertTo">Para</Label>
                <Select value={convertTo} onValueChange={setConvertTo}>
                  <SelectTrigger id="convertTo">
                    <SelectValue placeholder="Selecione a unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m">Metro (m)</SelectItem>
                    <SelectItem value="cm">Centímetro (cm)</SelectItem>
                    <SelectItem value="mm">Milímetro (mm)</SelectItem>
                    <SelectItem value="km">Quilômetro (km)</SelectItem>
                    <SelectItem value="in">Polegada (in)</SelectItem>
                    <SelectItem value="ft">Pé (ft)</SelectItem>
                    <SelectItem value="yd">Jarda (yd)</SelectItem>
                    <SelectItem value="mi">Milha (mi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="convertValue">Valor</Label>
              <Input
                id="convertValue"
                type="number"
                value={convertValue}
                onChange={(e) => setConvertValue(e.target.value)}
              />
            </div>
            <Button onClick={handleConvert}>Converter</Button>
            <div>
              <Label>Resultado</Label>
              <Input value={convertResult} readOnly className="font-bold" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

