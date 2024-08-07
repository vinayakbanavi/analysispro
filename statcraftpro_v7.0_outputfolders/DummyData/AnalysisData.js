const analysisData = {
  Descriptives: {
    All: {
      Statistics: {
        data:[
          {
            type : "selectionlist",
            name : "variables",
            label : "Variables",
            required: "true",
            measure : "scale",
            noofinputs : "multiple"            
          }, 
        ],
        options : [
          {
            type : "checkbox",
            name  : "mean",
            label : "Mean"
          },
          {
            optiontype : "checkbox",
            optionname  : "Median",
            optionlabel : "Median"
          },
          {
            optiontype : "checkbox",
            optionname  : "mode",
            optionlabel : "Mode"
          }
        ]    
      },
      Frequencies: {},
    },
    Statistics: {
      Statistics: {},
    },
    Distributions: {
      Frequencies: {},
    },
  },
  Charts: {
    All: {
      Histogram: {},
      ScatterPlot: {},
      BarPlot: {},
      BoxPlot: {},
      LinePlot: {},
      HeatMap: {},
      PairPlot: {},
      StripPlot: {},
      CountMap: {},
    },
    Plots: {
      Histogram: {},
      ScatterPlot: {},
      BarPlot: {},
      BoxPlot: {},
      LinePlot: {},
      HeatMap: {},
      PairPlot: {},
      StripPlot: {},
      CountMap: {},
    },
    Patterns: {
      Patterns: {},
      Trends: {},
      Outliers: {},
    },
  },
  Assumptions: {
    All: {
      ShapiroWilkTest: {},
      KolmogorovSmirnovTest: {},
      JarqueBeraTest: {},
      LevenesTest: {},
      BartlettsTest: {},
    },
    Normality: {
      ShapiroWilkTest: {},
      KolmogorovSmirnovTest: {},
      JarqueBeraTest: {},
    },
    Homogeneity: {
      LevenesTest: {},
      BartlettsTest: {},
    },
  },
  Distribution: {
    All: {
      OneSampleTTest: {},
      PairedSampleTTest: {},
      IndependentSamplesTTest: {},
      OneWayAnova: {},
      TwoWayAnova: {},
      WilcoxonSignedRankTest: {},
      WilcoxonRankSumTest: {},
      ManWhitneyUTest: {},
      KruskalWallisHTest: {},
      FriedManTest: {},
    },
    Parametric: {
      OneSampleTTest: {},
      PairedSampleTTest: {},
      IndependentSamplesTTest: {},
      OneWayAnova: {},
      TwoWayAnova: {},
    },
    NonParametric: {
      WilcoxonSignedRankTest: {},
      WilcoxonRankSumTest: {},
      ManWhitneyUTest: {},
      KruskalWallisHTest: {},
      FriedManTest: {},
    },
  },
  Association: {
    All: {
      Crosstab: {},
      Correlations: {},
    },
    BetweenCategories: {
      Crosstab: {},
    },
    BetweenContinuous: {
      Correlations: {},
    },
  },
  Regression: {
    All: {
      LinearRegression: {},
      BinomialLogisticRegression: {},
      MultiNomialLogisticRegression: {},
    },
    ContinuousOutcome: {
      LinearRegression: {},
    },
    CategoricalOutcome: {
      BinomialLogisticRegression: {},
      MultiNomialLogisticRegression: {},
    },
  },
  Dimensionalities: {
    All: {
      Manova: {},
      PCA: {},
      FactorAnalysis: {},
      LinearDiscriminantAnalysis: {},
    },
  },
  MachineLearning: {
    All: {
      DecisionTreeClassifier: {},
      RandomForestClassifier: {},
      MLPClassifier: {},
      SVMClassifier: {},
      DecisionTreeRegressor: {},
      RandomForestRegressor: {},
      MLPRegressor: {},
    },
    Classification: {
      DecisionTreeClassifier: {},
      RandomForestClassifier: {},
      MLPClassifier: {},
      SVMClassifier: {},
    },
    Regression: {
      DecisionTreeRegressor: {},
      RandomForestRegressor: {},
      MLPRegressor: {},
    },
  },
  Clustering: {
    All: {
      KMeans: {},
    },
  },
};

// console.log(analysisData); // Output the corrected structure with keys in quotes

const AnalysisTypeNames = {
  Descriptives: "Descriptives",
  Charts: "Charts",
  Assumptions: "Assumptions",
  Distribution: "Distribution",
  Association: "Association",
  Regression: "Regression",
  Dimensionalities: "Dimensionalities",
  MachineLearning: "Machine Learning",
  Clustering: "Clustering",
};

const AnalysisSubTypeNames = {
  All: "All",
  Statistics: "Statistics",
  Distributions: "Distributions",
  Plots: "Plots",
  Patterns: "Patterns",
  Normality: "Normality",
  Homogeneity: "Homogeneity",
  Parametric: "Parametric",
  NonParametric: "Non Parametric",
  BetweenCategories: "Between Categories",
  BetweenContinuous: "Between Continuous",
  ContinuousOutcome: "Continuous Outcome",
  CategoricalOutcome: "Categorical Outcome",
  Classification: "Classification",
  Regression: "Regression",
  All: "All",
};

const AnalysisNames = {
  Statistics: "Statistics",
  Frequencies: "Frequencies",

  Histogram: "Histogram",
  ScatterPlot: "Scatter Plot",
  BarPlot: "Bar Plot",
  BoxPlot: "Box Plot",
  LinePlot: "Line Plot",
  HeatMap: "Heat Map",
  PairPlot: "Pair Plot",
  StripPlot: "Strip Plot",
  CountMap: "Count Map",
  Patterns: "Patterns",
  Trends: "Trends",
  Outliers: "Outliers",

  ShapiroWilkTest: "Shapiro-Wilk Test",
  KolmogorovSmirnovTest: "Kolmogorov-Smirnov Test",
  JarqueBeraTest: "Jarque-Bera Test",
  LevenesTest: "Levene's Test",
  BartlettsTest: "Bartlett's Test",

  OneSampleTTest: "One Sample t-Test",
  PairedSampleTTest: "Paired Samples t-Test",
  IndependentSamplesTTest: "Independent Samples t-Test",
  OneWayAnova: "One-Way Anova",
  TwoWayAnova: "Two-Way Anova",
  WilcoxonSignedRankTest: "Wilcoxon Signed-Rank Test",
  WilcoxonRankSumTest: "Wilcoxon Rank-Sum Test",
  ManWhitneyUTest: "Man Whitney U Test",
  KruskalWallisHTest: "Kruskal-Wallis H-Test",
  FriedManTest: "Friedman Test",

  Crosstab: "Crosstab",
  Correlations: "Correlations",

  LinearRegression: "Linear Regression",
  BinomialLogisticRegression: "Binomial Logistic Regression",
  MultiNomialLogisticRegression: "MultiNomial Logistic Regression",

  Manova: "Manova",
  PCA: "PCA",
  FactorAnalysis: "Factor Analysis",
  LinearDiscriminantAnalysis: "Linear Discriminant Analysis",

  DecisionTreeClassifier: "Decision Tree Classifier",
  RandomForestClassifier: "Random Forest Classifier",
  MLPClassifier: "MLP Classifier",
  SVMClassifier: "SVM Classifier",
  DecisionTreeRegressor: "Decision Tree Regressor",
  RandomForestRegressor: "Random Forest Regressor",
  MLPRegressor: "MLP Regressor",

  KMeans: "KMeans",
};
